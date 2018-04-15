import React from 'react';
import { Redirect } from 'react-router-dom';
import { lifecycle } from 'recompact';

import { localStorageHelpers } from '../generic/helpers';

const Logout = () => <Redirect to="/auth" />;

export default lifecycle({
  componentDidMount() {
    localStorageHelpers.remove('AUTH_TOKEN');
  },
})(Logout);