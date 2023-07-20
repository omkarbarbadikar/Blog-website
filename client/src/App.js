import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { IndexPage } from "./components/IndexPage";
import { LoginPage } from "./components/LoginPage";
import { Register } from "./components/Register";
import BlogState from "./blogState";
import { CreatePost } from "./components/CreatePost";
import { PostPage } from "./components/PostPage";
import { EditPost } from "./components/EditPost";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <BlogState>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage/>} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/create" element={<CreatePost/>}/>
        <Route path="/post/:id" element={<PostPage/>} />
        <Route path="/edit/:id" element={<EditPost/>}/>
      </Route>
    </Routes>
    </BlogState>
    
  );
}

export default App;
