import React from "react";
import {
  Route,
  Switch
} from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import LandingScreen from "../../screens/Landing";
import UserScreen from "../../screens/User";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" component={LandingScreen} />
      <ProtectedRoute path="/me" component={UserScreen} />
      <Route component={LandingScreen} />
    </Switch>
  );
}