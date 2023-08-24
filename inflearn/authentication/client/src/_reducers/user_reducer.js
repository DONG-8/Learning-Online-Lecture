import { REGISTER_USER, LOGIN_USER, AUTH_USER } from "../_actions/types";

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      // 로그인 유저라는 action이 들어온다면,
      return { ...state, loginSuccess: action.payload };
    case REGISTER_USER:
      console.log(action.payload, "payload", {
        ...state,
        register: action.payload,
      });
      return { ...state, register: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    default:
      return state;
  }
}
