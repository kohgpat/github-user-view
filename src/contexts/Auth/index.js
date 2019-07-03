import React from "react";
import { loadState, saveState } from "../../utils/localStorage";
import { parseParams } from "../../utils/parseParams";
import API from "../../api";

function saveTokenToLocalStorage(token) {
  saveState({ auth: { token } });
  // window.location.href = "/";
}

function authenticate(token) {
  return new Promise((resolve, reject) => {
    if (token) {
      reject();
    }

    const params = parseParams(window.location.href);

    if (!params.code) {
      reject();
    }

    API.auth
      .login(params.code)
      .then(({ data: { token, error } }) => {
        if (token) {
          saveTokenToLocalStorage(token);
          resolve(token);
        } else if (error) {
          saveTokenToLocalStorage(undefined);
          reject();
        }
      })
      .catch(error => {
        if (error) {
          saveTokenToLocalStorage(undefined);
          reject();
        }
      });
  });
}

const AuthContext = React.createContext();

function AuthProvider(props) {
  const persistedState = loadState();

  const [state, setState] = React.useState(persistedState);

  const value = React.useMemo(() => [state, setState], [state]);

  const token =
    persistedState && persistedState.auth && persistedState.auth.token;

  authenticate(token)
    .then(token => {
      setState({
        ...state,
        auth: {
          ...state.auth,
          token
        }
      });
    })
    .catch(() => {});

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

export { AuthProvider, useAuth };
