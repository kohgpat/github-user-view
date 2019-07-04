import React from "react";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import LandingScreen from "../../screens/Landing";
import UserScreen from "../../screens/User";
import RepoScreen from "../../screens/Repo";

export default function Routes() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={LandingScreen} />
        <ProtectedRoute exact path="/me" component={UserScreen} />
        <ProtectedRoute exact path="/me/repos/:repo" component={RepoScreen} />
      </Switch>
    </>
  );
}
