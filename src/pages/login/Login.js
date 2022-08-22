import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import "./Login.scss";

//1. login_jsx
function Login() {
  const regexId = /@/;
  const regexPw = /^.{5,}$/;

  let [id, setId] = useState("");
  let [pw, setPw] = useState("");

  let [loginData, setLoginData] = useState("");

  let [token, setToken] = useState("");

  const handleIdInput = (event) => {
    setId(event.target.value);
  };

  const handlePwInput = (event) => {
    setPw(event.target.value);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if(loginData !== ""){
      fetch("http://auth.jaejun.me:10010/login", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData)
    }).then((res) => res.json())
      .then((data) => {
        localStorage.setItem('token', data.access_token);
        if(data.message){
          alert("로그인 정보가 올바르지 않습니다.")
        }else{
          navigate("./main");
        }
      })
    }  
    return setLoginData("");
  },[loginData])
  

  
  return (
    <>
      <div className="container">
        <section className="window">
          <div className="logo-wrapper">
            <span className="logo-text">justgram</span>
          </div>
          <div className="form-wrapper">
            <form name="login" id="loginform">
              <input
                type="text"
                id="email"
                className="inputStyle"
                placeholder="전화번호, 사용자 이름 또는 이메일"
                autoComplete="off"
                onChange={handleIdInput}
                value={id}
              />
              <input
                type="password"
                id="password"
                className="inputStyle"
                placeholder="비밀번호"
                autoComplete="off"
                onChange={handlePwInput}
                value={pw}
              />
              <button
                type="button"
                id="login"
                className="buttonStyle"
                onClick={() => 
                  setLoginData({
                    email: id,
                    password: pw
                })
              }
                disabled={regexId.test(id) && regexPw.test(pw) ? false : true}
              >
                로그인
              </button>
            </form>
          </div>
          <div className="extra-wrapper">
            <a className="link" href="https://www.instagram.com/accounts/password/reset/">
              비밀번호를 잊으셨나요?
            </a>
          </div>
        </section>
      </div>
    </>
  );
}

export default Login;
