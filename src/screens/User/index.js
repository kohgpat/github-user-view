import React, { useEffect } from "react";
import {
  Container,
  Heading,
  Hero,
  Level,
  Button,
  Image,
  Media
} from "react-bulma-components";
import { useAuth } from "../../contexts/Auth";
import { UserProvider, useUser } from "../../contexts/User";
import { ReposProvider, useRepos } from "../../contexts/Repos";

function User() {
  const { logout } = useAuth();
  const { getUser, fetchUser } = useUser();
  const { fetchRepos, getRepos } = useRepos();
  const user = getUser();
  const repos = getRepos();

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchRepos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) {
    return null;
  }

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

      <Hero color="warning">
        <Hero.Body>
          <Container>
            <Media>
              <Media.Item position="left">
                <Image src={user.avatar_url} size={96} alt="Avatar" />
              </Media.Item>

              <Media.Item>
                <Heading size={1}>{user.login}</Heading>
              </Media.Item>
            </Media>

            <Level>
              <Level.Side>
                <Level.Item>
                  <Heading size={4}>Following:</Heading>
                  <Heading size={4}>{user.following}</Heading>
                </Level.Item>
              </Level.Side>

              <Level.Side>
                <Level.Item>
                  <Heading size={4}>Followers:</Heading>
                  <Heading size={4}>{user.followers}</Heading>
                </Level.Item>
              </Level.Side>

              <Level.Side>
                <Level.Item>
                  <Heading size={4}>Public Repositories:</Heading>
                  <Heading size={4}>{user.public_repos}</Heading>
                </Level.Item>
              </Level.Side>
            </Level>

            <Heading size={1}>Public Repositories:</Heading>

            {repos.length > 1 &&
              repos.map(repo => <div key={repo.id}>{repo.name}</div>)}

            {!repos.length && <div>Fetching...</div>}
          </Container>
        </Hero.Body>
      </Hero>
    </div>
  );
}

const ConnectedUser = () => (
  <UserProvider>
    <ReposProvider>
      <User />
    </ReposProvider>
  </UserProvider>
);

export default ConnectedUser;
