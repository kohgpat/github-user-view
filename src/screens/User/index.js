import React, { useEffect } from "react";
import {
  Container,
  Heading,
  Hero,
  Level,
  Section,
  Button,
  Card,
  Content,
  Columns,
  Image,
  Media,
  Panel,
  Icon
} from "react-bulma-components";
import { useAuth } from "../../contexts/Auth";
import { UserProvider, useUser } from "../../contexts/User";

function User() {
  const { logout } = useAuth();
  const { getUser, getRepos, fetchRepos } = useUser();
  const user = getUser();
  const repos = getRepos();

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

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
          <Columns>
            <Columns.Column size={4}>
              <Card>
                <Card.Content>
                  <Media>
                    <Media.Item position="left">
                      <Image src={user.avatar_url} size={96} alt="Avatar" />
                    </Media.Item>

                    <Media.Item>
                      <Heading size={4}>{user.login}</Heading>
                    </Media.Item>
                  </Media>

                  <Content>
                    <Heading size={4}>Following:</Heading>
                    <Heading subtitle size={5}>
                      {user.following}
                    </Heading>

                    <Heading size={4}>Followers:</Heading>
                    <Heading subtitle size={5}>
                      {user.followers}
                    </Heading>

                    <Heading size={4}>Public Repositories:</Heading>
                    <Heading subtitle size={5}>
                      {user.public_repos}
                    </Heading>
                  </Content>
                </Card.Content>
              </Card>
            </Columns.Column>

            <Columns.Column size={8}>
              <Panel>
                <Panel.Header>Public Repositories:</Panel.Header>

                {repos.length > 1 &&
                  repos.map(repo => (
                    <Panel.Block key={repo.id}>
                      <Panel.Icon renderAs={Icon} icon="angle-down" />
                      {repo.name}
                    </Panel.Block>
                  ))}

                {!repos.length && <Panel.Block>Fetching...</Panel.Block>}
              </Panel>
            </Columns.Column>
          </Columns>
        </Container>
      </Section>
    </div>
  );
}

const ConnectedUser = () => (
  <UserProvider>
    <User />
  </UserProvider>
);

export default ConnectedUser;
