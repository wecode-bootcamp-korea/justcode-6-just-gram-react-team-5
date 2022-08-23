import "./Comment.scss";
function Comment(props, { feedData }) {
  const { user, content } = props; //구조분해할당;

  return (
    <span>
      <span className="bold">{user}</span> <span> {content}</span>
      {/* <span className="comment-like">{like}</span> */}
    </span>
  );
}

export default Comment;
