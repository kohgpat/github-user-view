import React from "react";
import { Link } from "react-router-dom";
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
              <Link className={s.link} to={`/me/repos/${repo.name}`}>{repo.name}</Link>
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
