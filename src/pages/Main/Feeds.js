import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Comments from "./Comments";

function Feeds() {

  const buttonImg = [
    "/images/main_img/img/heart.png",
    "/images/main_img/img/chat.png",
    "/images/main_img/img/dm.png"
  ];

  const [feeds, setFeeds] = useState([]);
  
  useEffect(()=>{
    fetch("/data/feed.json")
    .then(res => res.json())
    .then(data => {
      setFeeds(data.feedData);
      // console.log(data.feedData);
    })
  }, [])

  return feeds.map((feed, i) => {

    return (
      <div className="post-box" key={feed.feedId}>
        <div className="post-box-user">
          <Link to="">
            <img
              src="/images/main_img/img/profileimg.png"
              width="32px"
              alt=""
            />
          </Link>
          <div className="post-box-user-name">
            <Link to="">{feed.userName}</Link>
          </div>
          <Link to="" className="option-btn">
            <img src="/images/main_img/img/option.png" width="15px" alt="" />
          </Link>
        </div>

        <div className="post-box-img">
          <img src={feed.img} alt="" />
        </div>

        <div className="reaction">
          <div className="reaction-btn">
            <span className="reaction-btn-img">
              <img
                src={buttonImg[0]}
                width="23px"
                height="23px"
                alt=""
                onClick={() => {
                  let like = [...feeds];
                  like[i].like += 1;
                  setFeeds(like);
                }}
              />
              <img src={buttonImg[1]} width="23px" height="23px" alt="" />
              <img src={buttonImg[2]} width="23px" height="23px" alt="" />
            </span>
            <span>
              <Link to="">
                <img src="/images/main_img/img/save.png" width="23px" alt="" />
              </Link>
            </span>
          </div>

          <div className="feedLike">
            <Link to="">좋아요 {feed.like}개</Link>
          </div>

          <div className="reaction-user-name">
            <Link to="">{feed.userName}</Link> {feed.content}
          </div>

          <div className="comment">
            {feed.comments.map((comment) => {
              return (
                <div className="add-comment" key={comment.id}>
                  <span>
                    <Link to="">{comment.userName}</Link>
                    <span className="comments">{comment.comment}</span>
                  </span>
                  <button>
                    <img src="/images/main_img/img/heart.png" alt="" />
                  </button>
                </div>
              );
            })}
          </div>

          <Comments feeds={feeds} setFeeds={setFeeds} i={i} />
        </div>
      </div>
    );

  });

}

export default Feeds;
