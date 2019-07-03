import React from "react";
import { Redirect } from "react-router-dom";
import { Container, Heading, Hero, Button, Tag } from "react-bulma-components";
import LoginButton from "../../components/LoginButton";
import { useAuth } from "../../contexts/Auth";

export default function Landing() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isAuthenticated) {
    return <Redirect to="/me" />;
  }

  return (
    <div>
      <Hero color="warning" size="fullheight">
        <Hero.Body>
          <Container>
            <Heading size={1}>Github User View</Heading>
            <Heading size={4}>
              React demo application built with Hooks, Context API and Github
              API
            </Heading>

            {isLoading ? (
              <Tag color="black" size="medium">
                Authenticating...
              </Tag>
            ) : (
              <Button color="black" renderAs={LoginButton} />
            )}
          </Container>
        </Hero.Body>
      </Hero>
    </div>
  );
}
