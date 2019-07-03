import React from "react";
import { Container, Heading, Section, Button } from "react-bulma-components";
import { useAuth } from "../../contexts/Auth";

export default function Users() {
  const { logout } = useAuth();

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
