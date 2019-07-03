import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { loadState, saveState } from "./utils/localStorage";
import { AuthProvider } from "./contexts/Auth";
import Routes from "./components/Routes";

function App() {
  const savedState = loadState();
  const token = savedState && savedState.auth && savedState.auth.token;

  console.log("token: ", token);

  useEffect(() => {
    if (token) {
      return;
    }

    const regex = /[?&]([^=#]+)=([^&#]*)/g;
    const url = window.location.href;
    let params = {};
    let match;

    while ((match = regex.exec(url))) {
      params[match[1]] = match[2];
    }

    if (!params.code) {
      return;
    }

    fetch(`https://gh-gatekeeper.herokuapp.com/authenticate/${params.code}`)
      .then(response => response.json())
      .then(({ token, error }) => {
        if (token) {
          saveState({ auth: { token } });
          window.location.href = "/";

          // return <Redirect to="/" />;
        }

        if (error) {
          saveState({ auth: { token: undefined } });
          window.location.href = "/";
          // return <Redirect to="/" />;
        }
      })
      .catch(error => {
        console.log(error);

        if (error) {
          saveState({ auth: { token: undefined } });
          window.location.href = "/";
          // return <Redirect to="/" />;
        }
      });
  }, [token]);

  return (
    <Router>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Router>
  );
}

export default App;
