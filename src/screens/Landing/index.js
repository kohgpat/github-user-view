import React from "react";
import { Container, Heading, Hero, Button } from "react-bulma-components";

export default function Landing() {
  return (
    <div>
      <Hero color="warning" size="fullheight">
        <Hero.Body>
          <Container>
            <Heading size={1}>Github User View</Heading>
            <Heading size={4}>
              React demo application - Github user viewer
            </Heading>
            <Button color="black">Login with Github</Button>
          </Container>
        </Hero.Body>
      </Hero>
    </div>
  );
}
