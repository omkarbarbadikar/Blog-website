import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'

export const Register = () => {
  const navigate=useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

   async function register(e) {
    e.preventDefault();
    
    const responce=  await fetch(`http://localhost:4000/register`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
    if(responce.status===200){
      alert("Registration success")
      navigate('/login');
    }else{
      alert("Registration failed!");
    }
    setUsername('');
    setPassword('');
    
      
    
  } ;

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  );
};
