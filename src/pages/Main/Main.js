import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Feeds from "./Feeds";
import Nav from "./Nav";
import "./Main.scss";

function Main() {

  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem('token')){
      fetch('http://auth.jaejun.me:10010/me', {
        method: 'GET',
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      .then(res => res.json())
      .then(data => {
        // setEmail(data.email);
        data.email ? setEmail(data.email) : navigate('/');
      })
    }
  }, [])

  return (

    <div className="main">

      {/* 상단 고정 탭 */}
      <Nav email={email}/>

      {/* 메인 탭 */}
      <div id="main-container">

        {/* 메인 왼쪽 탭 */}
        <span id="inside-container1">
          {/* 게시글 */}
          <Feeds />
        </span>

        {/* 메인 오른쪽 탭 */}
        <span id="inside-container2">
          <div id="profile-box">
            <span>
              <img
                src="/images/main_img/img/profileimg.png"
                width="56px"
                alt=""
              />
            </span>
            <span id="profile-box-name">buddistMonk_youngin</span>
          </div>
          <div id="other">2202 INSTAGRAM FROM META</div>
        </span>

      </div>

    </div>

  );
  
}
    
export default Main;
