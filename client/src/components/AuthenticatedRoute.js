// @flow

import React, { type ComponentType } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Session from '../services/Session';

type Props = {
  component: ComponentType<{}>
};

const AuthenticatedRoute = ({ component, ...rest }: Props) => (
  <Route
    {...rest}
    render={(props) => {
      if (!Session.isAuthenticated()) {
        return <Redirect to='/' />;
      }

      const AuthenticatedComponent = component;
      return <AuthenticatedComponent {...props} />;
    }}
  />
);

export default AuthenticatedRoute;
