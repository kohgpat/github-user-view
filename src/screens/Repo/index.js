import React, { useEffect } from "react";
import { useUser } from "../../contexts/User";
import { RepoProvider, useRepo } from "../../contexts/Repo";
import Screen from "../../components/Screen";
import Topbar from "../../components/Topbar";
import Container from "../../components/Container";
import RepoStats from "../../components/RepoStats";

function Repo(props) {
  const { getUser, fetchUser } = useUser();
  const { getRepo, fetchRepo } = useRepo();
  const user = getUser();
  const repo = getRepo();
  const repoName = props.match.params.repo;

  useEffect(() => {
    if (user.login) {
      return;
    }

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (!user.login || !repoName) {
      return;
    }

    fetchRepo(user.login, repoName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, repoName]);

  return (
    <Screen>
      <Topbar />

      <Container>
        <RepoStats repo={repo} />
      </Container>
    </Screen>
  );
}

const ConnectedRepo = props => (
  <RepoProvider>
    <Repo {...props} />
  </RepoProvider>
);

export default ConnectedRepo;
