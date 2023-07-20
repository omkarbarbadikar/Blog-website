import express from 'express';
import { login, register,profile, logout } from '../controllers/user-controller.js';
import { create, getAll, getPost, update } from '../controllers/post-controller.js';
import multer from "multer";

const uploadMiddleware=multer({dest:'./uploads/'});

const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.get('/profile',profile);
router.post('/logout',logout);

router.post('/post',uploadMiddleware.single('file'),create);
router.get('/post',getAll);
router.get('/post/:id',getPost);
router.put('/post',uploadMiddleware.single('file'),update);



export default router;