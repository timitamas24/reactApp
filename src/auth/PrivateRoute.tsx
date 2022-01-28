import PropTypes from "prop-types";
import React, { Component, useContext } from "react";
import { AuthContext, AuthState } from "./AuthProvider";
import { Redirect, Route } from "react-router-dom";

export interface PrivateRouteProps {
  component: PropTypes.ReactNodeLike;
  path: string;
  exact?: boolean;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext<AuthState>(AuthContext);
  return (
    <Route {...rest} render={props => {
      if (isAuthenticated) {
        // @ts-ignore
        return <Component {...props} />;
      }
      return <Redirect to={{ pathname: '/login' }}/>
    }}/>
  );
};