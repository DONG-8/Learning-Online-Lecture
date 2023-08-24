import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";
import Auth from "../../../hoc/auth";
function RegisterPage() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navi = useNavigate();
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault(); // submit event의 새로고침 방지
    // 서버에 보내고자 하는 값을 가지고 있으니 이를 서버에 보내준다.
    let body = { email: Email, password: Password, name: Name };

    if (Password !== confirmPassword) {
      return alert("비밀번호와 비밀번호 확인의 값이 같아야 합니다.");
    }

    dispatch(registerUser(body)).then((res) => {
      if (res.payload.success) {
        console.log(res, "response");
        navi("/login");
      } else {
        alert("회원가입 실패!");
      }
    });
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
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
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler}></input>
        <br />
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler}></input>
        <label>Password</label>
        <input
          type="password"
          value={Password}
          onChange={onPasswordHandler}
        ></input>
        <br />
        <label>Comfirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={onConfirmPasswordHandler}
        ></input>
        <br />
        <button>Sign in</button>
      </form>
    </div>
  );
}

export default Auth(RegisterPage, false);
