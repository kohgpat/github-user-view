import React from "react";
import {
  Route
} from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import LandingScreen from "../../screens/Landing";
import UsersScreen from "../../screens/Users";

export default function Routes() {
  return (
    <>
      <Route path="/" component={LandingScreen} />
      <ProtectedRoute path="/users" component={UsersScreen} />
    </>
  );
}