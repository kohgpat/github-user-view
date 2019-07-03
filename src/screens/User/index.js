import React from "react";
import {
  Container,
  Heading,
  Hero,
  Level,
  Section,
  Button
} from "react-bulma-components";
import { useAuth } from "../../contexts/Auth";

export default function User() {
  const { logout } = useAuth();

  return (
    <div>
      <Hero color="warning">
        <Hero.Body>
          <Container>
            <Level>
              <Level.Side>
                <Level.Item>
                  <Heading size={4}>Github User View</Heading>
                </Level.Item>
              </Level.Side>

              <Level.Side>
                <Level.Item>
                  <Button color="black" onClick={logout}>
                    Logout
                  </Button>
                </Level.Item>
              </Level.Side>
            </Level>
          </Container>
        </Hero.Body>
      </Hero>

      <Section>
        <Container>
          <Heading size={1}>User</Heading>
        </Container>
      </Section>
    </div>
  );
}
