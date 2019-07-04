import React, { useEffect } from "react";
import { useAuth } from "../../contexts/Auth";
import { UserProvider, useUser } from "../../contexts/User";
import { RepoProvider, useRepo } from "../../contexts/Repo";
import Screen from "../../components/Screen";
import Topbar from "../../components/Topbar";
import Container from "../../components/Container";
import RepoInformation from "../../components/RepoInformation";

function Repo(props) {
  const { logout } = useAuth();
  const { getUser, fetchUser } = useUser();
  const { getRepo, fetchRepo } = useRepo();
  const user = getUser();
  const repo = getRepo();
  const repoName = props.match.params.repo;

  console.log("Repo: ", props);
  console.log("repoName: ", repoName);
  console.log("user: ", user);
  console.log("repo: ", repo);

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

  if (!repo) {
    return null;
  }

  return (
    <Screen>
      <Topbar user={user} logout={logout} />

      <Container>
        <RepoInformation repo={repo} />
      </Container>
    </Screen>
  );
}

const ConnectedRepo = props => (
  <UserProvider>
    <RepoProvider>
      <Repo {...props} />
    </RepoProvider>
  </UserProvider>
);

export default ConnectedRepo;
