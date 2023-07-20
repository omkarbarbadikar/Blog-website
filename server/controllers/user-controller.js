import bcrypt from 'bcryptjs'
import { UserModel } from '../models/user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

var salt = bcrypt.genSaltSync(10);
const secret=process.env.secret;

export const register=async (req, res) => {
    const { username, password } = req.body;
    var hash = bcrypt.hashSync(password, salt);
  
    try{
      const userDoc = await UserModel.create({ username,password:hash});
      res.status(200).json(userDoc);
  
    }catch(error){
      res.status(400).json(error);
    }
    
  };

export const login=async (req,res) => {
    const {username,password} = req.body;
    const userDoc = await UserModel.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      // logged in
      jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
        if (err) throw err;
        res.cookie('token', token).json({
          id:userDoc._id,
          username,
        });
      });
    } else {
      res.status(400).json('wrong credentials');
    }
    
  };
  export const profile=(req,res)=>{
    const {token} = req.cookies;
    
    jwt.verify(token, secret,{}, (err,info) => {
      if(err){
        res.send(err.message)
      }else{
        res.send(info)
      }
    })


    
    /* jwt.verify(token, secret, {}, (err,info) => {
      if (err) throw err;
      res.json(info);
    }); */
    
  };
  export const logout=(req,res)=>{
    res.cookie('token','').json('ok');
  };