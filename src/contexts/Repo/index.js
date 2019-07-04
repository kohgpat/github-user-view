import React from "react";
import API from "../../api";

const INITIAL_STATE = {
  repo: {}
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_REPO": {
      return {
        ...state,
        repo: action.payload.repo
      };
    }
    default: {
      throw new Error("RepoContext reducer: Unknown action type.");
    }
  }
}

const RepoContext = React.createContext();

function RepoProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

  const value = React.useMemo(() => [state, dispatch], [state]);

  return <RepoContext.Provider value={value} {...props} />;
}

function useRepo() {
  const context = React.useContext(RepoContext);

  if (!context) {
    throw new Error("useRepo should be used within a RepoContext");
  }

  const [state, dispatch] = context;

  const getRepo = () => {
    return state.repo || {};
  };

  const fetchRepo = (owner, repo) => {
    API.github.repos.getRepo(owner, repo).then(({ data: repo }) => {
      dispatch({ type: "SET_REPO", payload: { repo } });
    });
  };

  return {
    getRepo,
    fetchRepo
  };
}

export { RepoProvider, useRepo };
