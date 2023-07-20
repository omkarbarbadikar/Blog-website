import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import ReactQuill from 'react-quill';
export const EditPost = () => {
  const {id}=useParams();
  

  const navigate=useNavigate();
  const [title,setTitle]=useState('');
  const [summary,setSummary]=useState('');
  const[content,setContent]=useState('');
  const [files,setFiles]=useState('');
  const [redirect,setRedirect]=useState(false);

        
   
        useEffect(() => {
          fetch(`http://localhost:4000/post/${id}`).then((responce) =>
            responce.json().then((postInfo) => {
              setTitle(postInfo.title);
              setContent(postInfo.content);
              setSummary(postInfo.summary);
              
            })
          );
        }, []);


  const updatePost=async(e)=>{
    e.preventDefault();
    const data=new FormData();
        
    data.set('title',title);
    data.set('summary',summary);
    data.set('content',content);
    data.set('id',id)
    if(files[0]){
      data.set('file',files[0]);
    }
    

    const responce=await fetch('http://localhost:4000/post',{
      method:'PUT',
      body:data,
      credentials:'include',
    });
    if(responce.ok){
      setRedirect(true);
    }
  }

  if(redirect){
    navigate('/post/'+id);
 }
  return (
    <form onSubmit={updatePost}>
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
        <button type='submit' style={{marginTop:'5px'}}>Update Post</button> 
    </form>
  )
}
