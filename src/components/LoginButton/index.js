import React from "react";
import config from "../../config";

const CLIENT_ID = config.env.CLIENT_ID;
const REDIRECT_URI = config.env.REDIRECT_URI;

export default function Login({ className }) {
  return (
    <a
      className={className}
      href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}
    >
      Login with Github
    </a>
  );
}
