import React from "react";
import { loadState, saveState } from "../../utils/localStorage";
import { parseParams } from "../../utils/parseParams";
import API from "../../api";

function saveTokenToLocalStorage(token) {
  const state = loadState();
  saveState({
    ...state,
    auth: { token }
  });
}

function authenticate(params) {
  return new Promise((resolve, reject) => {
    if (!params.code) {
      reject();
    }

    API.auth
      .login(params.code)
      .then(({ data: { token, error } }) => {
        if (token) {
          resolve(token);

          API.github.users.getCurrentUser().then(user => {
            console.log(user);
          });
        } else if (error) {
          reject();
        }
      })
      .catch(error => {
        if (error) {
          reject();
        }
      });
  });
}

const AuthContext = React.createContext();

function AuthProvider(props) {
  const persistedState = loadState();
  const params = parseParams(window.location.href);

  const [state, setState] = React.useState({
    ...persistedState,
    auth: {
      ...persistedState.auth,
      isLoading: !!params.code
    }
  });

  const value = React.useMemo(() => [state, setState], [state]);

  const persistedToken =
    persistedState && persistedState.auth && persistedState.auth.token;

  if (!persistedToken) {
    authenticate(params)
      .then(token => {
        saveTokenToLocalStorage(token);

        setState({
          ...state,
          auth: {
            ...state.auth,
            isLoading: false,
            token
          }
        });
      })
      .catch(() => {
        saveTokenToLocalStorage(undefined);
      });
  }

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
    isLoading: state.auth.isLoading,
    token: state.auth.token,
    logout
  };
}

export { AuthProvider, useAuth };
