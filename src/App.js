import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
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
