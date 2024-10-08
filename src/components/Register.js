import React, { useState } from 'react';
import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom';
//const navigate = useNavigate();

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const headers = { "Access-Control-Allow-Origin": "*" };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://blog-backend-a8su.onrender.com/api/auth/register', { username, email, password },{headers});
            console.log(response.data); // Log the response data
            navigate("/login");
        } catch (err) {
            console.error(err.response ? err.response.data : err.message);
        }
        
    };

    return (
        <form onSubmit={handleSubmit} style={{width:'50%',margin:'auto'}}>
            <label htmlFor="Name">Name</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} className='form-control' placeholder="Username" />
            <label htmlFor="Name" style={{marginTop:"10px"}}>Email</label>
            <input type="text" value={email} className='form-control' onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <label htmlFor="Name" style={{marginTop:"10px"}}>Password</label>
            <input type="password" value={password} className='form-control' onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit" className='btn btn-primary' style={{marginTop:"10px"}}>Register</button>

            <br></br>
            <div className='d-flex justify-content-between align-items-center'>
            <p style={{marginBottom:'0px', marginTop:'10px'}}>Already Have Account</p>
            <button type="submit"className='btn btn-primary' style={{marginTop:'10px'}}>
                <Link to="/login" style={{color:"#fff"}}>Login</Link>
            </button>
            </div>
        </form>
    );
};

export default Register;
