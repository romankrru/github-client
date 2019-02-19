// @flow
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { localStorageHelpers } from '../generic/helpers';

const Logout = () => {
    useEffect(() => {
        localStorageHelpers.remove('AUTH_TOKEN');
    }, []);

    return <Redirect to="/auth" />
};

export default Logout;
