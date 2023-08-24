import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Auth from "../../../hoc/auth";
function LandingPage() {
  const navi = useNavigate();
  useEffect(() => {
    axios.get("/api/hello").then((res) => {
      console.log(res, "결과");
    });
  }, []);

  const onClickHandler = () => {
    axios.get("/api/user/logout").then((res) => {
      if (res.data.success) {
        // db에 저장된 해당 유저의 토큰을 제거함.
        // 그렇게 되면 이후 auth관리를 통해 로그인이 필요한 페이지의 경우 해당 token값을 찾을 수 없기 때문에 해당 페이지에는 접근이 불가능함
        // 브라우저에 있는 토큰도 제거하는게 맞지않나
        navi("/login");
      } else {
        alert("로그아웃 실패");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      LandingPage
      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  );
}

export default Auth(LandingPage, null);
