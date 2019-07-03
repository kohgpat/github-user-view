import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { AuthProvider } from "./contexts/Auth";
import Routes from "./components/Routes";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Router>
  );
}

export default App;
