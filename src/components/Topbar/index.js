import React from "react";
import Container from "../Container";
import Title from "../Title";
import Button from "../Button";
import s from "./Topbar.module.css";

const Topbar = ({ user, logout }) => (
  <div className={s.topbar}>
    <Container className={s.container}>
      <Title>{user.login}</Title>
      <Button onClick={logout}>Logout</Button>
    </Container>
  </div>
);

export default Topbar;
