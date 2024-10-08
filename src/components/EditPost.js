import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../App.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { userContext } from '../App';

const EditPost = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const { id } = useParams();
    const user = useContext(userContext);
    const navigate = useNavigate();
    const headers = { "Access-Control-Allow-Origin": "*" };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { title, desc };
            const response = await axios.put(`https://blogbackend-bt2a.onrender.com/editpost/${id}`, data,{headers});
            console.log(response.data); // Check the updated data
            navigate("/"); // Redirect after successful update
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`https://blogbackend-bt2a.onrender.com/getpostbyid/${id}`);
                setTitle(response.data.title);
                setDesc(response.data.desc);
            } catch (err) {
                console.log(err);
            }
        };
        fetchPost(); // Call the async function
    }, [id]);

    return (
        <div>
            <form action="" className='form_blog' onSubmit={handleSubmit}>
                <h1 style={{ textAlign: 'left', padding: '10px', fontWeight: 'bold', fontSize: '30px' }}>Edit Blog</h1>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter Title' />
                <textarea name="desc" id="desc" cols={50} rows={10} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder='Enter description'></textarea>
                <button type="submit" className='btn btn-primary' style={{ marginTop: '10px', width: '16%',}}>
                    Update Post
                </button>
            </form>
        </div>
    );
}

export default EditPost;
