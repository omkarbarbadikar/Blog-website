import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";


export const Post = ({
  _id,
  auther,
  title,
  summary,
  cover,
  content,
  createdAt,
}) => {
  const { username } = auther;
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={"http://localhost:4000/" + cover} />
        </Link>
      </div>

      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title} </h2>
        </Link>
        <p className="info">
          <a className="auther">by {username} |</a>
          <time> {format(new Date(createdAt), "MMM d,yyyy HH:mm")}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
  
};
