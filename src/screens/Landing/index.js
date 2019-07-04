import React from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import Screen from "../../components/Screen";
import Container from "../../components/Container";
import Title from "../../components/Title";
import Subtitle from "../../components/Subtitle";
import Label from "../../components/Label";
import LoginButton from "../../components/LoginButton";

export default function Landing() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isAuthenticated) {
    return <Redirect to="/me" />;
  }

  return (
    <Screen>
      <Container>
        <Title>Github User View</Title>
        <Subtitle>
          React demo application built with Hooks, Context API and Github API
        </Subtitle>

        {isLoading ? <Label>Authenticating...</Label> : <LoginButton />}
      </Container>
    </Screen>
  );
}
