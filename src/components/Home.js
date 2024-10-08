import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import '../App.css';
import { Link } from 'react-router-dom';
import { userContext } from '../App';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const user = useContext(userContext);
  useEffect(() => {
    axios.get("https://blogbackend-bt2a.onrender.com/getposts")
      .then(posts => {
        setPosts(posts.data);
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <div>

      <div>
      {posts.map(post => (
        <Link to={`/post/${post._id}`} style={{textDecoration:'none',color:'#000'}}>
          {
            user.email === post.email ? 
            <div key={post.id} style={{border:'1px solid #ccc',margin:'1%',display:'flex'}}>
            <div style={{padding:'10px'}}>
              <img src={`https://blogbackend-bt2a.onrender.com/Images/${post.file}`} style={{maxHeight:'159px'}} alt="" />
            </div>
            <div style={{padding:'5px'}}>
              <h5>{post.title}</h5>
              <p>{post.desc}</p>
            </div>
          </div>
          :
          <></>
          }
        
        </Link>
      ))
      }
      </div>
    </div>
  )
}

export default Home
