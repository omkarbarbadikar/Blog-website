import React, { useContext, useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import { format } from "date-fns";
import BlogContext from "../blogContex";

export const PostPage = () => {
  const {userInfo}=useContext(BlogContext);
  
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((responce) =>
      responce.json().then((postInfo) => {
        setPostInfo(postInfo);
      })
    );
  }, []);

  if (!postInfo) {
    return "";
  }
  
  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <div className="author">By {postInfo.auther.username}</div>
      <time>{format(new Date(postInfo.createdAt), "MMM d,yyyy HH:mm")}</time>
      <h5 className="summary">{postInfo.summary}</h5>
      {userInfo.id === postInfo.auther._id && (
        <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
            Edit Post
          </Link>
        </div>
      )}

      <div className="imgsummary">
      
        <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
      

      <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
      </div>
      
    </div>
    
  );
};
