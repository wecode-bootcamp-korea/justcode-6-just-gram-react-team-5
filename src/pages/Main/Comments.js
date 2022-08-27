import { useState, useRef } from "react";
// import { Link } from "react-router-dom";

function Comments(props) {

  const { feeds } = props;

  const [btn, setBtn] = useState(true);
  // const [id, setId] = useState(0);
  const [btnColor, setBtnColor] = useState('#CBE5FD');
  const value = useRef();
  
  const atvBtn = () => {
    if(value.current.value){
      setBtn(false);
      setBtnColor('#0095f6');
    } else{
      setBtn(true);
      setBtnColor('#CBE5FD');
    }
  }
  
  const addComment = () => {
    // setId(id + 1);
    let newComment = [...feeds];

    newComment[props.i].comments[newComment[props.i].comments.length] = {
      id: feeds[props.i].comments.length,
      userName: 'buddistMonk_youngin',
      comment: value.current.value,
    }

    props.setFeeds(newComment);
    value.current.value = null;
    setBtn(true);
    setBtnColor('#CBE5FD');
  }

  const onKeyDown = (e) => {
    if(e.key === 'Enter'){
      addComment();
    }
  }

  return (
    <div className="reaction-comment-box"
      onChange={atvBtn}
    >
      <input
        className="input-comment"
        type="text"
        placeholder="댓글 달기..."
        onKeyDown={onKeyDown}
        ref={value}
      />
      <button
        className="input-comment-btn"
        disabled={btn}
        style={{ color: btnColor }}
        onClick={addComment}
      >
        게시
      </button>
    </div>
  );
}

export default Comments;
