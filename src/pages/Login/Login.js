// import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";

function Login() {

  const navigate = useNavigate();

  const [emailValue, setIdValue] = useState('');
  const [pwValue, setPwValue] = useState('');
  // const [loginData, setLoginData] = useState('');
  const [loginBtn, setLoginBtn] = useState(true);
  const [background, setBackground] = useState('#C0DFFD');


  const handleIdInput = (event) => {
    setIdValue(event.target.value);
  };

  const handlePwInput = (event) => {
    setPwValue(event.target.value);
  };
  
  const atvBtn = () => {
    let condition = emailValue.indexOf("@") !== -1 && pwValue.length > 4;
    condition ? setLoginBtn(false) : setLoginBtn(true);
    condition ? setBackground('#0095f6') : setBackground('#C0DFFD');
  }

  const onClick = () => {
    fetch("http://auth.jaejun.me:10010/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "email": emailValue,
          "password": pwValue
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.access_token) {
            localStorage.setItem("token", data.access_token);
            navigate("/main");
          } else {
            alert("다시");
          }
        });
    console.log(123123);
  }

  return (
    <div className="main-box">
      <div className="first-container">
        <div className="logo-box">
          <Link to="/">
            <img
              src="/images/login_img/instagram-logo.png"
              width="175px"
              height="51px"
              alt=""
            />
          </Link>
        </div>
        <div className="input-box" onKeyUp={atvBtn}>
          <input
            className="identify"
            type="text"
            placeholder="전화번호, 사용자 이름 또는 이메일"
            onChange={handleIdInput}
          />
          <input
            type="password"
            className="password"
            placeholder="비밀번호"
            onChange={handlePwInput}
          />
          <input
            type="button"
            className="login-btn"
            value="로그인"
            onClick={onClick}
            disabled={loginBtn}
            style={{background: background}}
          />
        </div>
        <div className="extra-box">
          <div className="or-text">또는</div>
          <div className="facebook-login-btn">
            <a href=".">
              <img
                src="/images/login_img/facebook-logo.png"
                alt="facebook-logo"
                width="16px"
                height="16px"
              />
              Facebook으로 로그인
            </a>
          </div>
          <div className="find-password">
            <a href=".">비밀번호를 잊으셨나요?</a>
          </div>
        </div>
      </div>
      <div className="second-container">
        <div>
          계정이 없으신가요?
          <Link to="/signup" href=".">
            가입하기
          </Link>
        </div>
      </div>
      <div className="third-container">앱을 다운로드하세요.</div>
      <div className="fourth-container">
        <a href=".">
          <img
            className="appstore-btn"
            src="/images/login_img/download-btn-ios.png"
            width="136px"
            height="40px"
            alt=""
          />
        </a>
        <a href=".">
          <img
            src="/images/login_img/download-btn-android.png"
            width="136px"
            height="40px"
            alt=""
          />
        </a>
      </div>
    </div>
  );
}

export default Login;
