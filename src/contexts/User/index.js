import React from "react";
import API from "../../api";

const INITIAL_STATE = {
  user: {}
};

const UserContext = React.createContext();

function UserProvider(props) {
  const [state, setState] = React.useState(INITIAL_STATE);

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

  const fetchUser = () => {
    API.github.users.getCurrentUser().then(({ data: user }) => {
      setState({
        ...state,
        user
      });
    });
  };

  return {
    getUser,
    fetchUser
  };
}

export { UserProvider, useUser };
