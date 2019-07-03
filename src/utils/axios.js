import axios from "axios";
import { loadState, saveState } from "./localStorage";

const getBaseUrl = () => {
  return "https://api.github.com";
};

const instance = axios.create({
  baseURL: getBaseUrl(),
  timeout: 5000,
  headers: {
    "Content-Type": "application/json"
  }
});

instance.interceptors.request.use(function(config) {
  const state = loadState();
  const token = state.auth.token;
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

instance.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if ([401, 403].includes(error.response.status)) {
      const state = loadState();

      saveState({
        ...state,
        auth: {
          ...state.auth,
          token: undefined
        }
      });
    } else {
      return Promise.reject(error);
    }
  }
);

export default instance;
