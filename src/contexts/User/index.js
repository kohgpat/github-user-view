import React from "react";
import API from "../../api";
import { loadState } from "../../utils/localStorage";

const INITIAL_STATE = {
  user: {},
  repos: []
};

const UserContext = React.createContext();

function UserProvider(props) {
  const initialState = loadState() || INITIAL_STATE;

  const [state, setState] = React.useState(initialState);

  const value = React.useMemo(() => [state, setState], [state]);

  return <UserContext.Provider value={value} {...props} />;
}

function useUser() {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error("useUser should be used within a UserContext");
  }

  const [state, setState] = context;

  const getUser = () => {
    return state.user;
  };

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
    getUser,
    getRepos,
    fetchRepos
  };
}

export { UserProvider, useUser };
