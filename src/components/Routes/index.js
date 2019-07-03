import React from "react";
import {
  Route
} from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";

export default function Routes() {
  return (
    <>
      <Route path="/" component={LandingScreen} />
      <Route path="/login" component={LoginScreen} />
      <ProtectedRoute path="/users" component={UsersScreen} />
    </>
  );
}