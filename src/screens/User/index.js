import React from "react";
import { Container, Heading, Section, Button } from "react-bulma-components";
import { useAuth } from "../../contexts/Auth";

export default function User() {
  const { logout } = useAuth();

  return (
    <div>
      <Section>
        <Container>
          <Heading size={1}>User</Heading>
          <Button onClick={logout}>Logout</Button>
        </Container>
      </Section>
    </div>
  );
}
