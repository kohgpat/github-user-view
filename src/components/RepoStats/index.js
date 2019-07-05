import React from "react";
import Title from "../Title";
import s from "./RepoStats.module.css";

export default function RepoStats({ repo }) {
  if (!repo.id) {
    return <div className={s.repo}></div>;
  }

  return (
    <div className={s.repo}>
      <Title className={s.title}>{repo.name}</Title>

      <div className={s.container}>
        <div className={s.stat}>
          <Title>Stars</Title>
          <Title secondary>{repo.stargazers_count}</Title>
        </div>

        <div className={s.stat}>
          <Title>Subscribers</Title>
          <Title secondary>{repo.subscribers_count}</Title>
        </div>

        <div className={s.stat}>
          <Title>Watchers</Title>
          <Title secondary>{repo.watchers_count}</Title>
        </div>
      </div>
    </div>
  );
}
