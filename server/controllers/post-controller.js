import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import {PostModel} from '../models/post.js';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();


var salt = bcrypt.genSaltSync(10);
const secret=process.env.secret;

export const create=async (req,res)=>{
    const {originalname,path}=req.file;
    const parts=originalname.split('.');
    const ext=parts[parts.length -1];
    const newPath=path+'.'+ext;
    fs.renameSync(path,newPath);
  
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async(err,info) => {
      if (err) throw err;
  
    const {title,summary,content}=req.body;
    const postDoc=await PostModel.create({
      title,
      summary,
      content,
      cover:newPath,
      auther:info.id,
    });
    res.json(postDoc);
    });
    
  };

export const getAll=async(req,res)=>{
  
    res.json(await PostModel
      .find()
      .populate('auther',['username'])
      .sort({createdAt:-1}));
  
  };

export const getPost=async(req,res)=>{
    const {id}=req.params;
    const postDoc=await PostModel.findById(id).populate('auther',['username']);
  
    res.json(postDoc);
  };

export const update=async(req,res)=>{
    let newPath=null;
    if(req.file){
      const {originalname,path}=req.file;
      const parts=originalname.split('.');
      const ext=parts[parts.length -1];
      newPath=path+'.'+ext;
      fs.renameSync(path,newPath);
    }
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async(err,info) => {
      if (err) throw err;
  
    const {title,summary,content,id}=req.body;
    const postDoc=await PostModel.findById(id);
  
    const isAuther=JSON.stringify(postDoc.auther)===JSON.stringify(info.id)
    if(!isAuther){
      return res.status(400).json('you are not the auther')
      
    }
    await postDoc.updateOne({
      title,
      summary,
      content,
      cover:newPath?newPath:postDoc.cover,
    }); 
    res.json(postDoc);
    
    
    });
  };