import React from "react";
import { Route, Redirect } from "react-router-dom";

import { isAdminAuthenticated, isAuthenticated } from "../utils/is-auth";

export function ProtectedRoute(props: React.ComponentProps<typeof Route>) {
  if (props.path?.includes('admin')) {
    if (isAdminAuthenticated()) return <Route {...props} />;
    else return <Redirect to="/login" />;
  }
  if (isAuthenticated()) return <Route {...props} />;
  return <Redirect to="/login" />;
}
