import React from "react";
import { Link} from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import { useUser } from "../../contexts/User";
import Container from "../Container";
import Title from "../Title";
import Button from "../Button";
import s from "./Topbar.module.css";

const Topbar = () => {
  const { logout } = useAuth();
  const { getUser } = useUser();

  const user = getUser();

  return (
    <div className={s.topbar}>
      <Container className={s.container}>
        <Title>
          <Link className={s.link} to="/me">{user.login}</Link>
        </Title>
        <Button onClick={logout}>Logout</Button>
      </Container>
    </div>
  );
};

export default Topbar;
