import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";
import { useNavigate } from "react-router-dom";
// specificComponent -> Route에 불러와진 Component
// oprtion => null , true, false 로 구성됨
// null 아무나, true 로그인한 유저, false 로그인한 유저는 출입 불가능
// adminRoute -> admin인지 체크 default == null
export default function Auth(SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    const navi = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(auth()).then((res) => {
        if (!res.payload.isAuth) {
          // 로그인을 안했을 때
          if (option) {
            // 만약 로그인한 유저만 이동 가능한 페이지라면
            navi("/login");
          }
        } else {
          // 로그인을 했을 때
          if (adminRoute && !res.payload.isAdmin) {
            navi("/");
          } else {
            if (option === false) {
              navi("/");
            }
          }
        }
      });
    }, []);

    return <SpecificComponent />;
  }
  return AuthenticationCheck;
}
