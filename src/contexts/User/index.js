import React from "react";
import API from "../../api";

const INITIAL_STATE = {
  user: {}
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_USER": {
      return {
        ...state,
        user: action.payload.user
      };
    }
    default: {
      throw new Error("UserContext reducer: Unknown action type.");
    }
  }
}

const UserContext = React.createContext();

function UserProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

  const value = React.useMemo(() => [state, dispatch], [state]);

  return <UserContext.Provider value={value} {...props} />;
}

function useUser() {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error("useUser should be used within a UserContext");
  }

  const [state, dispatch] = context;

  const getUser = () => {
    return state.user;
  };

  const fetchUser = () => {
    API.github.users.getCurrentUser().then(({ data: user }) => {
      dispatch({ type: "SET_USER", payload: { user } });
    });
  };

  return {
    getUser,
    fetchUser
  };
}

export { UserProvider, useUser };
