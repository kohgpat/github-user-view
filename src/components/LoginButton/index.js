import React from "react";
import config from "../../config";
import s from "./LoginButton.module.css";

const CLIENT_ID = config.env.CLIENT_ID;
const REDIRECT_URI = config.env.REDIRECT_URI;

export default function Login() {
  return (
    <a
      href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}
      className={s.login}
    >
      Login with Github
    </a>
  );
}
