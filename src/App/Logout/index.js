// @flow
import React, {useEffect} from 'react';
import Loader from '../../generic/Loader';
import {useApolloClient} from 'react-apollo-hooks';
import {type RouterHistory} from 'react-router';

import localStorageHelpers from '../../generic/helpers/local-storage';

const Logout = (props: $Exact<{history: RouterHistory}>) => {
	const client = useApolloClient();

	useEffect(() => {
		localStorageHelpers.remove('AUTH_TOKEN');
		client.clearStore().then(() => props.history.replace('/auth'));
	}, []);

	return <Loader />;
};

export default Logout;
