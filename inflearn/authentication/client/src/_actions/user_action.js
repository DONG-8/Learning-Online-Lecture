// action 에 대한 type과 data를 함께 넘긴다

import axios from "axios";
import { REGISTER_USER, LOGIN_USER, AUTH_USER } from "./types";

export function loginUser(dataToSubmit) {
  const request = axios
    .post("/api/user/login", dataToSubmit)
    .then((res) => res.data);
  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataToSubmit) {
  const request = axios
    .post("/api/user/register", dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios.get("/api/user/auth").then((res) => res.data);
  return {
    type: AUTH_USER,
    payload: request,
  };
}
