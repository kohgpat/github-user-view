import React, { useEffect } from "react";
import { UserProvider, useUser } from "../../contexts/User";
import { ReposProvider, useRepos } from "../../contexts/Repos";
import Screen from "../../components/Screen";
import Topbar from "../../components/Topbar";
import Container from "../../components/Container";
import Stats from "../../components/Stats";
import Repos from "../../components/Repos";

function User() {
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
    <Screen>
      <Topbar />

      <Container>
        <Stats user={user} />
        <Repos repos={repos} />
      </Container>
    </Screen>
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
