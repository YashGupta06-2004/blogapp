import React, { useContext, useEffect, useState } from 'react'
import {Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import '../App.css';
import { userContext } from '../App';
const Post = () => {
    const {id} = useParams();
    const [post,setPost] = useState({})
    const navigate = useNavigate();
    const user = useContext(userContext)

    useEffect(() => {
      const fetchPost = async () => {
          try {
              const response = await axios.get(`https://blogbackend-bt2a.onrender.com/getpostbyid/${id}`);
              setPost(response.data);
          } catch (err) {
              console.log(err);
          }
      };
      fetchPost(); // Call the async function
  }, [id]);
  const handelDelete = async (id) => {
    try {
        const response = await axios.delete(`https://blogbackend-bt2a.onrender.com/deletepost/${id}`);
        console.log("Successfully deleted:", response.data); // Log success message
        navigate("/"); // Navigate after successful deletion
    } catch (err) {
        console.error("Error deleting post:", err); // Log any errors
    }
};


   // Add id as a dependency
  return (
    <>
    <div style={{border:'1px solid #ccc',marginLeft:'1%',display:'flex'}}>
       <div>
        <img src={`https://blogbackend-bt2a.onrender.com/Images/${post.file}`} style={{maxHeight:'159px'}}  alt="" />
       </div>
       <div style={{padding:'5px'}}>
        <h5>{post.title}</h5>
        <p>{post.desc}</p>
       </div>
    </div>
    {
      user.email === post.email ? 
      <div style={{marginTop:'10px'}}>
      
      <button type="submit"className='btn btn-primary' style={{marginRight:'10px',marginLeft:'10px'}}>
      <Link to={`/editpost/${post._id}`} style={{color:"#fff",textDecoration:'none',}}>Edit</Link>
  </button>
  <button type="submit"className='btn btn-primary' onClick={e => handelDelete(post._id)}>
      Delete
  </button>
  </div>
      :
      <></>
    }
  
</>
  )
}

export default Post
