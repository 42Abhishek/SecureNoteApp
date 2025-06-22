import React, { useState , useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import axiosClient from '../axiosClient';
import {useContext} from "react";
import {UserContext} from '../contexts/UserContext';


const Login = () => {

  e.preventDefault();
  
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useContext(UserContext);


  useEffect(() => {
  axiosClient.get("/user/validate")
    .then((res) => {
      setUser(res.data.user);
      navigate('/dashboard');
    })
    .catch((err) => {
      console.log("Not logged in");;
    });
  },[]);

 const handleLogin = async (e) => {
  
    e.preventDefault();

    try{

      const response = await axiosClient.post('/user/login',{
        email : email,
        password : password
      });

      console.log("Login Successful", response.data);

      const res = await axiosClient.get('/user/validate');
      setUser(res.data.user); 

      navigate('/dashboard');

    }catch(err){
      console.log("error: " + err);
    }
    
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
