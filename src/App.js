import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/login';
import Navbar from './components/Navbar';
import Create from './components/create';
import Post from './components/Post';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import EditPost from './components/EditPost';

export const userContext = createContext();
function App() {
    const [user,setUser] = useState({})
    
axios.defaults.withCredentials = true;
   useEffect(() => {
       axios.get("https://blogbackend-bt2a.onrender.com/")
       .then(user => {
        setUser(user.data)
       })
       .catch((err) => console.log(err))
   },[])

    return (
        <userContext.Provider value={user}>
        <Router>
        <Navbar/>
            <Switch>
                <Route exact path='/' basename="/" element={<Home/>}/>
                <Route path="/register" basename="/register" element={<Register/>} />
                <Route path="/login" basename="/login" element={<Login/>} />
                <Route path="/create" basename="/create" element={<Create/>} />
                <Route path="/post/:id" basename="/post/:id" element={<Post/>} />
                <Route path="/editpost/:id" basename="/editpost/:id" element={<EditPost/>} />
            </Switch>
        </Router>
        </userContext.Provider>
    );
    
}

export default App;
