import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogContext from "../blogContex";
import { useNavigate } from "react-router-dom";


export const Header = () => {
  const {userInfo,setUserInfo}=useContext(BlogContext);
  const navigate=useNavigate();
  
  useEffect(() => {
    /* try{
      const responce=fetch("http://localhost:4000/profile", {
        credentials: 'include',
      });
      responce.json().then((Info) => {
        setUserInfo(Info);
        console.log(Info);
      });


    }catch(e){
      navigate('/');

    } */

    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((Info) => {
        setUserInfo(Info);
        
      });
    });
  }, []);

  function logout() {
    
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
      
    });
    navigate('/login');
    setUserInfo(null);
  }
  const username=userInfo===null?null:userInfo.username;
  return (
    <header>
      <Link style={{fontWeight:'Bold',fontSize:'25px'}} to="/" className="Logo">
        My Blog
      </Link>
      <nav>
      { username&& (
          <div>
            <Link style={{padding:'15px'}} to="/create" >Create new post</Link>
            <a onClick={logout}>Logout ({username})</a>
          </div>
        )}
        {!username && (
          <div>
            <Link  to="/login">Login</Link>
            <Link style={{padding:'15px'}} to="/register">Register</Link>
          </div>
        )}
      </nav>
    </header>
  );
};
