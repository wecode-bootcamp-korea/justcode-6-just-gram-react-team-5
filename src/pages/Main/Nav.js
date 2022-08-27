import { useState } from "react";
import { Link } from "react-router-dom";

function Nav(props) {

  const { email } = props;

  const [navImg] = useState([ //nav 이미지 경로
    "/images/main_img/img/hut.png",
    "/images/main_img/img/dm.png",
    "/images/main_img/img/explore.png",
    "/images/main_img/img/heart.png",
  ]);

  return (
    <header>
      <nav id="header-tab">
        <Link to="/main" className="main-btn">
          <img
            src="/images/main_img/img/instagram-logo.png"
            width="30px"
            alt=""
          />
        </Link>
        <input type="text" placeholder="검색" id="search-box" />
        <span id="list-box">
          {navImg.map((navImg, i) => {
            return (
              <Link to="" key={i}>
                <img src={navImg} alt="" width={"24px"} />
              </Link>
            );
          })}
          {email ? email :
          <Link to="">
            <img src={"/images/main_img/img/profile.png"} alt="" width={"24px"} />
          </Link>}
          
        </span>
      </nav>
    </header>
  );
}

export default Nav;