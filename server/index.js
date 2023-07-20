import express from "express";
import cors from "cors";
import path from 'path';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const __dirname = path.resolve();
app.use("/uploads", express.static(__dirname + '/uploads'));

app.use(cors({credentials:true,
  origin:`http://localhost:3000`,
  method:["GET","POST","PUT","DELETE","POST"],
}));

app.use(express.json());
app.use (cookieParser());


//components
import Router from './routes/routes.js';
import Connection from "./database/db.js";

const username = process.env.user;
const password = process.env.pass;

Connection(username, password);

app.use('/', Router);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}!`);
});
