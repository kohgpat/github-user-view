import React from "react";
import Title from "../Title";
import s from "./Repos.module.css";

const Repos = ({ repos }) => {
  return (
    <div className={s.repos}>
      <Title>Public Repositories</Title>

      {repos ? (
        <ul className={s.list}>
          {repos.map(repo => (
            <li className={s.item} key={repo.id}>
              {repo.name}
            </li>
          ))}
        </ul>
      ) : (
        <div className={s.message}>Fetching...</div>
      )}
    </div>
  );
};

export default Repos;
