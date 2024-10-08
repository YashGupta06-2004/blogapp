import React, { useContext } from 'react'
import '../App.css'
import {Link, Navigate, useNavigate} from 'react-router-dom';
import App, { userContext } from '../App';
import axios from 'axios';

const Navbar = () => {
    const user = useContext(userContext);
    const navigate = useNavigate();
    const handleLogout = () => {
      axios.get("https://blogbackend-bt2a.onrender.com/logout")
      .then(res => {
        if(res.data === "success")
        navigate(0)
      })
    .catch((err) => {
        console.log(err)
    })
}
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid" style={{background:"#712cf9",color:'#fff',height:"50px"}}>
  {/* <Link style={{textDecoration:'none',color:'#fff',fontSize:"18px",marginRight:'10px'}}>Yash Gupta</Link> */}
    <div className="collapse navbar-collapse m-auto " style={{height:'50px'}}  id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to="/" style={{textDecoration:'none',color:'#fff',fontSize:"18px",marginRight:'10px'}}>Home</Link>
        </li>
    
        { user.username ?
        <ul style={{display:'flex'}}>
        <li className="nav-item" style={{listStyle:'none'}}>
        <Link to="/create" style={{textDecoration:'none',color:'#fff',fontSize:"18px",marginRight:'10px'}}>Create</Link>
       </li>
       <li className="nav-item" style={{listStyle:'none'}}>
        <Link style={{textDecoration:'none',color:'#fff',fontSize:"18px"}}>{user.username}</Link>
        </li>
        </ul>
        :
        ''
        }
      </ul>
      
    </div>
    {
    user.username?
     <button onClick={handleLogout} className="btn" style={{background:'#fff',marginRight:'10px',}} type="submit">Logout</button>
        :
    <form className="d-flex" role="search">
      <button className="btn" style={{background:'#fff',marginRight:'10px',}} type="submit"><Link to="/register" style={{textDecoration:'none'}}>Register</Link></button>
        <button className="btn" style={{background:'#fff',}} type="submit"><Link to="/login" style={{textDecoration:'none'}}>Login</Link></button>
      </form>
      }
  </div>
</nav>
<h1 style={{ textAlign: 'center', padding: '10px', fontWeight: 'bold' }}>Yash Blog App</h1>
    </div>
  )
}

export default Navbar

