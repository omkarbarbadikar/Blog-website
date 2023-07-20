import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useNavigate} from 'react-router-dom';


export const CreatePost = () => {
    const navigate=useNavigate();


   
    const [title,setTitle]=useState('');
    const [summary,setSummary]=useState('');
    const[content,setContent]=useState('');
    const [files,setFiles]=useState('');
    const [redirect,setRedirect]=useState(false);

    const createNewPost=async(e)=>{
        const data=new FormData();
        
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('file',files[0]);
        e.preventDefault();
        
        

        const responce=await fetch('http://localhost:4000/post',{
            credentials: "include",
            method:'POST',
            body:data,
        });
        if(responce.ok){
            setRedirect(true);
        }

    }

    if(redirect){
       navigate('/');
    }

  return (
    <form onSubmit={createNewPost}>
        <input 
        type='title' 
        placeholder='title'
         value={title}
          onChange={(e)=>{
            setTitle(e.target.value);
          }}/>
        <input type='summary' placeholder='summary'
        value={summary}
        onChange={(e)=>{
            setSummary(e.target.value);
          }}
        />
        <input type='file'
            
            onChange={e=>setFiles(e.target.files)}
        />
        <ReactQuill
        value={content}

        onChange={(newValue)=>{
            setContent(newValue);
          }}
        />
        <button type='submit' style={{marginTop:'5px'}}>Create Post</button> 
    </form>
  )
}
