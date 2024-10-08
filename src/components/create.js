import React, { useContext, useState } from 'react';
import '../App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../App';

const Create = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    //const [email , setEmail] = useState("");
    const [file, setFile] = useState("");
    const navigate = useNavigate();
    const headers = { "Access-Control-Allow-Origin": "*" };
    const user = useContext(userContext);
    console.log(user);
    if (!user.email) {
      console.error("User : email is not defined!");
      return;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('desc', desc);
        formData.append('email', user.email); // Ensure user.email is defined
        formData.append('file', file);
        console.log(user.email)
        try {
            const response = await axios.post("https://blogbackend-bt2a.onrender.com/create", formData, { 
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Accept": "application/json"
                }
            },{headers});
            console.log(response.data);
            navigate("/"); // Move this inside the try block to ensure it runs after successful response
        } catch (err) {
            console.error(err); // Log error details
        }
    };

    return (
        <div>
            <form encType="multipart/form-data" className='form_blog' onSubmit={handleSubmit}>
                <h1 style={{ textAlign: 'left', padding: '10px', fontWeight: 'bold', fontSize: '30px' }}>Create Blog</h1>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter Title' required />
                <textarea name="desc" id="desc" cols={50} rows={15} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder='Enter description' required></textarea>
                <input type="file" id='file' onChange={(e) => setFile(e.target.files[0])} required />
                <button type="submit" className='btn btn-primary' style={{ marginTop: '10px' }}>
                    Post
                </button>
            </form>
        </div>
    );
}

export default Create;
