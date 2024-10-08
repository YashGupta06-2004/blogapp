import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../App';

const Login = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {setUser} = useContext(userContext)
    //const [errorMessage, setErrorMessage] = useState('');
    //const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Corrected the spelling
    const headers = { "Access-Control-Allow-Origin": "*" };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://blog-backend-a8su.onrender.com/api/auth/login', { username, email, password },{headers});
            localStorage.setItem('token', response.data.token);
            console.log(response.data); // Log the response data
            navigate("/");
        } catch (err) {
            console.error(err.response ? err.response.data : err.message);
        }
        
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="Name">Name</label>
            <input 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Username" className='form-control'
                required 
            />
            <label htmlFor="Name" style={{ marginTop: "10px" }}>Email</label>
            <input 
                type="text" 
                value={email} 
                className='form-control' 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email" 
            />
            <label htmlFor="Password" style={{ marginTop: "10px" }}>Password</label>
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password" className='form-control'
                required 
            />
            <button type="submit" className='btn btn-primary' style={{ marginTop: '10px', marginRight: '10px' }}>
                Login
            </button>
            <button type="button" className='btn btn-primary' style={{ marginTop: '10px' }}>
                <Link to="/register" style={{ color: "#fff", textDecoration: 'none' }}>Back</Link>
            </button>
        </form>
    );
};

export default Login;