import React from "react";
import Title from "../Title";
import s from "./RepoStats.module.css";

export default function RepoStats({ repo }) {
  return (
    <div className={s.repo}>
      <Title>{repo.name}</Title>

      <div className={s.container}>
        <div>
          <Title>Stars</Title>
          <Title>{repo.stargazers_count}</Title>
        </div>

        <div>
          <Title>Subscribers</Title>
          <Title>{repo.subscribers_count}</Title>
        </div>

        <div>
          <Title>Watchers</Title>
          <Title>{repo.watchers_count}</Title>
        </div>
      </div>
    </div>
  );
}
