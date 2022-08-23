import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.scss";

function Login() {
  //아이디와 비밀번호 input값 가져오기
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  function handleIdInput(event) {
    setId(event.target.value);
  }
  function handlePwInput(event) {
    setPw(event.target.value);
  }
  //버튼 활성화 구현
  //기본값(비활성화 = true)
  const [active, setActive] = useState(true);

  //버튼 활성화 조건 //삼향 연산자 (~일떄 ? truthy값 : falsy값 )
  function activeButton() {
    //활성화 조건 ? 비활성화를 하지않겠다 = 활성화하겠다. : 비활성화 true
    id.includes("@") && pw.length >= 5 ? setActive(false) : setActive(true);
  }

  return (
    <>
      <div className="login">
        <div className="header">
          <h1>Justgram</h1>
        </div>
        <div className="login-box">
          <div className="login-wrapper">
            <input
              id="input-id"
              className="login-input"
              placeholder="전화번호, 사용자 이름 또는 이메일"
              onChange={handleIdInput}
              //키 입력시 버튼 활성화 함수로..
              onKeyUp={activeButton}
            />
          </div>
          <div className="login-wrapper">
            <input
              id="input-pw"
              className="login-input"
              placeholder="비밀번호"
              onChange={handlePwInput}
              onKeyUp={activeButton}
            />
          </div>
          <div className="btn-wrapper">
            <Link to="/Main">
              <button
                type="submit"
                id="login-btn"
                //활성화 됐을 때 활성화버튼 css, 아니면 그냥 버튼
                className={active ? "activeBtn" : "btn"}
                disabled={active}
              >
                로그인
              </button>
            </Link>
          </div>
          <div className="footer">
            <Link to="/signup" className="forgot-pw">
              비밀번호를 잊으셨나요?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
