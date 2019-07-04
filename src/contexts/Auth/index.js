import React from "react";
import { loadState, saveState } from "../../utils/localStorage";
import { parseParams } from "../../utils/parseParams";
import API from "../../api";

const INITIAL_STATE = {
  auth: {
    token: undefined,
    isLoading: false
  }
};

function saveTokenToLocalStorage(token) {
  const state = loadState() || INITIAL_STATE;

  saveState({
    ...state,
    auth: {
      ...state.auth,
      token
    }
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

function reducer(state, action) {
  switch (action.type) {
    case "SET_TOKEN": {
      return {
        ...state,
        auth: {
          ...state.auth,
          token: action.payload.token,
          isLoading: false
        }
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        auth: {
          ...state.auth,
          token: undefined,
          isLoading: false
        }
      };
    }
    default: {
      throw new Error("AuthContext reducer: Unknown action type.");
    }
  }
}

const AuthContext = React.createContext();

function AuthProvider(props) {
  const persistedState = loadState();
  const params = parseParams(window.location.href);

  const initialState = persistedState
    ? {
        ...persistedState,
        auth: {
          ...persistedState.auth,
          isLoading: !!params.code
        }
      }
    : INITIAL_STATE;

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = React.useMemo(() => [state, dispatch], [state, dispatch]);

  const persistedToken =
    persistedState && persistedState.auth && persistedState.auth.token;

  if (!persistedToken) {
    authenticate(params)
      .then(token => {
        saveTokenToLocalStorage(token);
        dispatch({ type: "SET_TOKEN", payload: { token } });
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
    throw new Error("useAuth should be used within a AuthContext");
  }

  const [state, dispatch] = context;

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    saveState(INITIAL_STATE);
  };

  return {
    isAuthenticated: !!state.auth.token,
    isLoading: state.auth.isLoading,
    token: state.auth.token,
    logout
  };
}

export { AuthProvider, useAuth };
