import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
// import fillheart from "../../images/fill.png";
// import notfillheart from "../../images/notfill.png";

import "./Main.scss";

function Comments(props) {
  const { id, comment, onRemove, onClick } = props;
  const value = useRef();
  const feed = useRef();

  function check() {
    if (value.current.src === "http://localhost:3000/images/notfill.png") {
      value.current.src = "http://localhost:3000/images/fill.png";
    } else if (value.current.src === "http://localhost:3000/images/fill.png") {
      value.current.src = "http://localhost:3000/images/notfill.png";
    }
  }

  
  return (
    <>
      <div className="heart" ref={feed}>
        <div>
          <span className="feed-favor-name" style={{ fontWeight: "bold", marginRight: "5px" }}>
            {comment.user}
          </span>
          <span className="feed-favor-name">
            {comment.comment} - {comment.createdAt}
          </span>
        </div>
        <div className="feed-comments-right-wrapper flex-center">
          <a className="cursor" onClick={() => onRemove(comment.id)}>
            댓글삭제
          </a>
          <img alt="heart" className="feed-favor-image check" src="./images/notfill.png" ref={value} onClick={check} />
        </div>
      </div>
    </>
  );
}

export default Comments;
