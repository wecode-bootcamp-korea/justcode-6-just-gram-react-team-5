import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import "./Main.scss";

function Feed({ feedData }) {
  // console.log(feedData);
  //댓글
  const [comment, setComment] = useState("");
  //아이디 값
  const [id, setId] = useState(1);
  //댓글을 담는 배열
  //commentArray안에 객체들이 늘어나면 댓글이 추가된다
  const [commentArray, setCommentArray] = useState([]);

  useEffect(() => {
    fetch("/data/comment.json")
      .then((res) => res.json())
      .then((data) =>
        // console.log(data)
        setCommentArray(data.commentData)
      );
  }, []);

  function addComment(event) {
    event.preventDefault(); // 다른 이벤트가 발생되지 않도록 해준다.
    setId(id + 1);
    //comment
    const newComment = {
      id: id,
      content: comment,
    };
    setCommentArray([...commentArray, newComment]);
    // form 태그를 사용했을때 input과 button을 가지고 있다. 그래서, => event는 입력한 댓글.form[0]은 input ([1]은 button). .value는 그 값을 '' 빈칸으로 만들어준다.
    event.target.form[0].value = "";
    // input창 초기화
    setComment("");
  }

  const commentValid = comment.length >= 1;

  // useEffect(() => {
  //   fetch("/data/feed.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // console.log("data", data);
  //     });
  // }, []);

  return (
    <>
      {/* 피드 */}
      <div className="feed-box">
        {/* 피드 헤더 */}
        <div className="feed-header">
          <div className="profile">
            <img
              alt="profile"
              src="/images/my.png"
              width="30px"
              height="30px"
            />
            <span className="vertical id">&nbsp;&nbsp;{feedData.user}</span>
          </div>
          <div class="menu-image-right">
            <img
              alt="더보기"
              src="/images/dots.png"
              width="20px"
              height="20px"
            />
          </div>
        </div>
        {/* 피드 사진 */}
        <div className="feed-photo">
          <img
            alt="you8in 님의 게시물"
            src={feedData.img}
            width="100%"
            height="100%"
          />
        </div>
        {/* 피드 메뉴 */}
        <div className="feed-menu">
          <div className="menu-image-left">
            <img
              alt="좋아요"
              src="/images/fill_heart.png"
              width="25px"
              height="25px"
            />
            <img
              alt="댓글달기"
              src="/images/balloon.png"
              width="25px"
              height="25px"
            />
            <img
              alt="공유하기"
              src="/images/send.png"
              width="25px"
              height="25px"
            />
          </div>
          <div className="menu-image-right">
            <img
              alt="컬렉션에 저장"
              src="/images/mark.png"
              width="30px"
              height="25px"
            />
          </div>
        </div>
        {/* 피드 글 */}
        <div className="post-box">
          {/* 좋아요 */}
          <div className="feed-like vertical">
            <img src="/images/my.png" width="20px" height="20px" />
            <span className="tag">&nbsp;you8in</span>님 외&nbsp;
            <span class="tag"> 여러 명</span>이 좋아합니다
          </div>
          {/* 게시 글 */}
          <div className="feed-desc">
            <span className="tag">{feedData.user}</span> {feedData.content}
            <span class="gray">&nbsp;더 보기</span>
          </div>
          {/* 댓글 창 */}
          <div className="comment">
            <div className="comment-list">
              {commentArray.map((comment) => {
                return (
                  <li key={comment.id}>
                    <Comment
                      id={comment.id}
                      user={comment.user || "edenpark"}
                      content={comment.content}
                      // like={comment.like}
                    />
                  </li>
                );
              })}
            </div>
            <div className="gray date">1일 전</div>
            <div className="comment-line line"></div>
            <form className="comment-submit">
              <input
                type="text"
                className="comment-input gray"
                placeholder="댓글 달기..."
                onChange={(event) => {
                  setComment(event.target.value);
                }}
              />
              <button
                className={commentValid ? "validBtn" : "comment-btn"}
                onClick={addComment}
                disabled={!commentValid}
              >
                게시
              </button>
            </form>
          </div>
        </div>
      </div>
      <Comment />
    </>
  );
}

export default Feed;
