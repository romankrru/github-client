import React from 'react';
import { Redirect, Route } from 'react-router';

import { localStorageHelpers } from '../helpers';

const withAuthRequired = BaseComponent => {
  const WithAuthRequired = props => (
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