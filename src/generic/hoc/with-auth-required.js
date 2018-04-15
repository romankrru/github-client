import React from 'react';
import { Redirect } from 'react-router';

import { localStorageHelpers } from '../helpers';

const withAuthRequired = BaseComponent => {
  const WithAuthRequired = props => localStorageHelpers.load('AUTH_TOKEN')
    ? <BaseComponent {...props} />
    : <Redirect to="/auth" />;

  return WithAuthRequired;
};

export default withAuthRequired;