import React from "react";
import { Redirect } from "react-router-dom";
import { Container, Heading, Hero, Button } from "react-bulma-components";
import LoginButton from "../../components/LoginButton";
import { useAuth } from "../../contexts/Auth";

export default function Landing() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect to="/users" />;
  }

  return (
    <div>
      <Hero color="warning" size="fullheight">
        <Hero.Body>
          <Container>
            <Heading size={1}>Github User View</Heading>
            <Heading size={4}>
              React demo application - Github user viewer
            </Heading>
            <Button color="black" renderAs={LoginButton} />
          </Container>
        </Hero.Body>
      </Hero>
    </div>
  );
}
