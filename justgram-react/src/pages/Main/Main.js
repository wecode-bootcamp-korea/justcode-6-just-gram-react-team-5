import React, { useEffect, useState } from "react";
import "./Main.scss";
import Feed from "./Feed";

function Main() {
  //피드 연결
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    fetch("/data/feed.json")
      .then((res) => res.json())
      .then((data) => {
        // console.log("data", data);
        setFeed(data.feedData);
      });
  }, []);

  return (
    <>
      <div className="main">
        {/* 헤더영역 */}
        <div className="header-box">
          <div className="vertical">
            <img src="/images/instagram.png" width="30" height="30px" />
            <div className="title">
              <h1>Justgram</h1>
            </div>
          </div>
          <div className="vertical">
            <input type="search" className="search" placeholder="검색" />
          </div>
          <div className="header-icon">
            <img alt="홈으로.." src="/images/home.png" />
            <img alt="보내기" src="/images/send.png" />
            <img alt="게시물 올리기" src="/images/more.png" />
            <img alt="사람 찾기" src="/images/explore.png" />
            <img alt="좋아한 게시물" src="/images/heart.png" />
            <img alt="프로필 바로가기" src="/images/my.png" />
          </div>
        </div>
      </div>
      {feed.map((feed) => {
        return <Feed key={feed.id} feedData={feed} />;
      })}
    </>
  );
}

export default Main;
