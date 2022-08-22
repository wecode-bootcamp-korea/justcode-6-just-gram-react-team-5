import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login/Login";
import Main from "./pages/main/Main";

function Router() {
  return (
    <BrowserRouter>
    
      <Routes>
        //노드에서 연결했듯이 라우팅을 해준다.
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
      </Routes>
 
    </BrowserRouter>
  );
}
export default Router;