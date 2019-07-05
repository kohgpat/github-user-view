import React from "react";
import Title from "../Title";
import s from "./UserStats.module.css";

export default function UserStats({ user }) {
  return (
    <div>
      <div className={s.container}>
        <div className={s.stat}>
          <Title>Following</Title>
          <Title secondary>{user.following}</Title>
        </div>

        <div className={s.stat}>
          <Title>Followers</Title>
          <Title secondary>{user.followers}</Title>
        </div>

        <div className={s.stat}>
          <Title>Public Repositories</Title>
          <Title secondary>{user.public_repos}</Title>
        </div>
      </div>
    </div>
  );
}
