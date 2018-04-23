// @flow

import * as React from 'react';
import { Redirect, Route } from 'react-router';

import { localStorageHelpers } from '../helpers';

const withAuthRequired = (BaseComponent: React.ComponentType<any>) => {
  const WithAuthRequired = (props: Object) => (
    <Route render={({location}) => {
      if (location.pathname === '/auth') {
        return null;
      }

      return localStorageHelpers.load('AUTH_TOKEN')
        ? <BaseComponent {...props} />
        : <Redirect to="/auth" />
    }}/>
  );

  return WithAuthRequired;
};

export default withAuthRequired;