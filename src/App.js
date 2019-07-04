import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/Auth";
import { UserProvider } from "./contexts/User";
import Routes from "./components/Routes";

function App() {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <Routes />
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
