import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";

import Comments from "./Comments";
import "./Main.scss";

function Feeds(props) {
  const { dataFeeds } = props;
  const [comment, setComment] = useState("");
  const [commentsArray, setCommentsArray] = useState(dataFeeds.comments);
  const [color, setColor] = useState("");
  const [cursor, setCursor] = useState("");
  const [inputState, setInputState] = useState("");

  const commentValue = useRef();
  const imgValue = useRef();


  //ref훅, spread 이용
  const addComment = () => {
    let newId = commentsArray.length === 0 ? 1 : commentsArray[commentsArray.length - 1].id + 1;
    const newComment = {
      id: newId,
      user: "익명",
      comment: commentValue.current.value,
      createdAt: new Date().toLocaleString(),
    };
    setCommentsArray([...commentsArray, newComment]);
    setColor("rgb(187, 187, 216)");
    setCursor("default");
    setInputState("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value === "") {
      alert("댓글을 입력하지 않으셨습니다.");
    } else {
      setComment(e.target.value);
      setColor("blue");
      setCursor("pointer");
      if (e.key === "Backspace" && e.target.value === "") {
        setColor("rgb(187, 187, 216)");
        setCursor("default");
      } else if (e.key === "Enter" && e.target.value !== "") {
        addComment();
      }
    }
  };

  
  function onRemove(id) {
    setCommentsArray(
      commentsArray.filter((comment) => {
        return comment.id !== id;
      })
    );
  }

  function check() {
    if (imgValue.current.src === "http://localhost:3000/images/notfill.png") {
      imgValue.current.src = "http://localhost:3000/images/fill.png";
    } else if (imgValue.current.src === "http://localhost:3000/images/fill.png") {
      imgValue.current.src = "http://localhost:3000/images/notfill.png";
    }
  }

  return (
    <>
      <section className="feed-container">
        {/* <!-- 피드 헤더 --> */}
        <div className="feed-header-wrapper">
          <div className="feed-header-left">
            <img className="feed-profile-image userImage" src={dataFeeds.userImage} />
            <span className="feed-profile-name userName">{dataFeeds.userName}</span>
          </div>
          <div className="feed-header-right">
            <span className="etc">...</span>
          </div>
        </div>

        {/* <!-- 피드 사진 --> */}
        <div className="feed-photo-wrapper">
          <img className="feed-photo-image feedImage" src={dataFeeds.feedImage} />
        </div>

        {/* <!-- 피드 메뉴바 --> */}
        <div className="feed-menubar-favor-wrapper">
          <div className="feed-menubar-wrapper">
            <div className="feed-menubar-left">
              <img src="./images/notfill.png" ref={imgValue} style={{ width: "25px", height: "25px", marginLeft: "5px" }} onClick={check} />
              <i className="fa-regular fa-comment menubar-icon"></i>
              <i className="fa-solid fa-arrow-up-from-bracket menubar-icon"></i>
            </div>
            <div className="feed-menubar-right">
              <i className="fa-regular fa-bookmark"></i>
            </div>
          </div>
          <div className="feed-favor-wrapper">
            <img src="./images/userImage3.jpg" className="feed-favor-image" />
            <span className="feed-favor-name">
              aineworld님 외 <span className="countLiked">{dataFeeds.countLiked}</span>명이 좋아합니다
            </span>
          </div>
        </div>

        {/* <!-- 피드 댓글 --> */}
        <div className="feed-comments-plus-wrapper">
          <div className="feed-comments-wrapper">
            <div className="feed-comments-left-wrapper">
              <div className="feed-comments-left">
                {commentsArray.map((comment) => {
                  return <Comments key={comment.id} id={comment.id} comment={comment} onRemove={onRemove}/>;
                })}
              </div>
              <div style={{ alignItems: "flex-start" }}>
                <span className="feed-favor-name" style={{ color: "gray" }}>
                  <span className="feedTime">{dataFeeds.feedTime}</span>분전
                </span>
              </div>
            </div>
          </div>

          <div className="feed-plus-wrapper">
            <input
              type="text"
              placeholder="댓글 달기..."
              className="input-comments"
              onKeyUp={onKeyDown}
              onChange={(e) => {
                setInputState(e.target.value);
              }}
              ref={commentValue}
              value={inputState}
            />
            <span
              className="input-comments-button"
              style={{ color: color, cursor: cursor }}
              onClick={(e) => {
                comment !== "" ? addComment() : alert("댓글을 입력하지 않으셨습니다.");
              }}
            >
              게시
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

export default Feeds;
