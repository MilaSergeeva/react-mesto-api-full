import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      rest.loggedIn === true ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect to={{ pathname: "/signin" }} />
      )
    }
  />
);

export default ProtectedRoute;
