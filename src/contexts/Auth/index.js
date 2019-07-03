import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { loadState, saveState } from "../../utils/localStorage";
import { parseParams } from "../../utils/parseParams";
import API from "../../api";

function saveTokenAndRedirect(token) {
  saveState({ auth: { token } });
  window.location.href = "/";
}

function login(code) {
  API.auth
    .login(code)
    .then(({ data: { token, error } }) => {
      if (token) {
        saveTokenAndRedirect(token);
      } else if (error) {
        saveTokenAndRedirect(undefined);
      }
    })
    .catch(error => {
      if (error) {
        saveTokenAndRedirect(undefined);
      }
    });
}

const AuthContext = React.createContext();

function Provider(props) {
  const persistedState = loadState();

  const [state, setState] = React.useState(persistedState);

  const value = React.useMemo(() => [state, setState], [state]);

  const token =
    persistedState && persistedState.auth && persistedState.auth.token;

  useEffect(() => {
    if (token) {
      return;
    }

    const params = parseParams(window.location.href);

    if (!params.code) {
      return;
    }

    login(params.code);
  }, [token]);

  console.log(value);

  return <AuthContext.Provider value={value} {...props} />;
}

function useAuth() {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useLists should be used within a AuthContext");
  }

  const [state, setState] = context;

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
    logout
  };
}

const AuthProvider = withRouter(Provider);

export { AuthProvider, useAuth };
