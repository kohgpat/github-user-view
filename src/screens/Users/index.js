import React from "react";
import { Container, Heading, Section, Button } from "react-bulma-components";
import { useAuth } from "../../contexts/Auth";
import axios from "../../utils/axios";

export default function Users() {
  const { isAuthenticated, logout } = useAuth();

  console.log("isAuthenticated: ", isAuthenticated);

  axios
    .get("https://api.github.com/repos/vmg/redcarpet/issues?state=closed")
    .then(res => {
      console.log(res);
    });

  return (
    <div>
      <Section>
        <Container>
          <Heading size={1}>Users</Heading>
          <Button onClick={logout}>Logout</Button>
        </Container>
      </Section>
    </div>
  );
}
