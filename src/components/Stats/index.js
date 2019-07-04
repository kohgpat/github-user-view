import React from "react";
import Container from "../Container";
import Title from "../Title";
import s from "./Stats.module.css";

const Stats = ({ user }) => (
  <div>
    <Container className={s.container}>
      <div>
        <Title>Following</Title>
        <Title>{user.following}</Title>
      </div>

      <div>
        <Title>Followers</Title>
        <Title>{user.followers}</Title>
      </div>

      <div>
        <Title>Public Repositories</Title>
        <Title>{user.public_repos}</Title>
      </div>
    </Container>
  </div>
);

export default Stats;
