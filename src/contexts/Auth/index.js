import React from "react";
import { loadState, saveState } from "../../utils/localStorage";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const persistedState = loadState();

  const [state, setState] = React.useState(persistedState);

  const value = React.useMemo(() => [state, setState], [state]);

  return <AuthContext.Provider value={value} {...props} />;
}

function useAuth() {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useLists should be used within a AuthContext");
  }

  const [state, setState] = context;

  const login = () => {};

  const logout = () => {
    const logoutState = {
      ...state,
      auth: {
        ...state.auth,
        token: undefined
      }
    };

    setState(logoutState);
    saveState(logoutState);
  };

  return {
    isAuthenticated: !!state.auth.token,
    token: state.auth.token,
    login,
    logout
  };
}

export { AuthProvider, useAuth };
