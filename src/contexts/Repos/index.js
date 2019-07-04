import React from "react";
import API from "../../api";

const INITIAL_STATE = {
  repos: []
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_REPOS": {
      return {
        ...state,
        repos: action.payload.repos
      };
    }
    default: {
      throw new Error("ReposContext reducer: Unknown action type.");
    }
  }
}

const ReposContext = React.createContext();

function ReposProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

  const value = React.useMemo(() => [state, dispatch], [state]);

  return <ReposContext.Provider value={value} {...props} />;
}

function useRepos() {
  const context = React.useContext(ReposContext);

  if (!context) {
    throw new Error("useUser should be used within a ReposContext");
  }

  const [state, dispatch] = context;

  const getRepos = () => {
    return state.repos || [];
  };

  const fetchRepos = () => {
    API.github.repos.getRepos().then(({ data: repos }) => {
      dispatch({ type: "SET_REPOS", payload: { repos } });
    });
  };

  return {
    getRepos,
    fetchRepos
  };
}

export { ReposProvider, useRepos };
