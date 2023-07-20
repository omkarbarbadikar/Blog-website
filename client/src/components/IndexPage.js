import React, { useEffect, useState,useContext} from 'react'
import { Post } from './post'
import BlogContext from "../blogContex";
export const IndexPage = () => {

  const [posts,setPosts]=useState([]);
  const {userInfo,setUserInfo}=useContext(BlogContext);

  useEffect((()=>{
    
     fetch('http://localhost:4000/post').then(responce=>{
      responce.json().then(allPosts=>{
        console.log(allPosts);
        setPosts(allPosts);
      });
     })
  }),[])
  const username=userInfo===null?null:userInfo.username;

  return (
    <div>
    <h2>Welcome {username} to My Blog 😊</h2>
        {
          posts.length>0 && posts.map(post=>
          <Post {...post}/>
          )}
    </div>
  )
}
