import React from "react";
import API from "../../api";

const INITIAL_STATE = {
  repos: []
};

const ReposContext = React.createContext();

function ReposProvider(props) {
  const [state, setState] = React.useState(INITIAL_STATE);

  const value = React.useMemo(() => [state, setState], [state]);

  return <ReposContext.Provider value={value} {...props} />;
}

function useRepos() {
  const context = React.useContext(ReposContext);

  if (!context) {
    throw new Error("useUser should be used within a ReposContext");
  }

  const [state, setState] = context;

  const getRepos = () => {
    return state.repos || [];
  };

  const fetchRepos = () => {
    API.github.repos.getRepos().then(({ data: repos }) => {
      setState({
        ...state,
        repos
      });
    });
  };

  return {
    getRepos,
    fetchRepos
  };
}

export { ReposProvider, useRepos };
