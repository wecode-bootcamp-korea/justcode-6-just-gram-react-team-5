import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Feeds from "./Feeds";

import "./Main.scss";

function Main() {
  const [jsonFeeds, setJsonFeeds] = useState([]);

  useEffect(() => {
    fetch("./data/feed.json", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setJsonFeeds(data.feeds);
      });
  }, [jsonFeeds]);

  
  return (
    <>
      <div className="wrap">
        {/* <!-- 헤더 --> */}
        <header className="header-wrapper">
          <div className="title-wrapper">
            <img className="icon" src="images/instagram.png" />
            <span className="title">| justgram</span>
          </div>
          <div className="search-wrapper">
            <div>
              <input type="text" placeholder="검색" className="search" id="search" autoComplete="off" />
            </div>
            <div className="add"></div>
            <div className="add-wrapper"></div>
          </div>
          <div className="icon--wrapper">
            <img className="icon" src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/bearu/explore.png" />
            <img className="icon" src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/bearu/heart.png" />
            <img className="icon drop" id="drop" src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/bearu/profile.png" />
            <div className="user-interface-wrapper"></div>
            <div className="user-interface">
              <div className="interface">
                <img className="icon-down" src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/bearu/profile.png" />
                프로필
              </div>
              <div className="interface">
                <i className="fa-regular fa-bookmark" style={{ marginRight: "13px", marginLeft: "4px" }}></i>저장됨
              </div>
              <div className="interface">
                <img className="icon-down2" src="./images/settings.png" />
                설정
              </div>
              <div className="interface down" id="logout">
                로그아웃
              </div>
            </div>
          </div>
        </header>
        {jsonFeeds.map((feeds) => {
          return <Feeds key={feeds.id} dataFeeds={feeds} />;
        })}
      </div>
    </>
  );
}

export default Main;
