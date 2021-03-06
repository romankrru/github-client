// @flow
import React from 'react';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import {ApolloLink, concat} from 'apollo-link';
import {Route, Switch, Redirect} from 'react-router-dom';
import {ApolloProvider} from 'react-apollo-hooks';

import {localStorageHelpers} from '../generic/helpers';
import Layout from '../generic/Layout';
import {withAuthRequired} from '../generic/hoc';
import Home from './Home';
import Discover from './Discover';
import Logout from './Logout';

const httpLink = new HttpLink({uri: 'https://api.github.com/graphql'});

// add the authorization to the headers
const authMiddleware = new ApolloLink((operation, forward) => {
	operation.setContext({
		headers: {
			authorization: `Bearer ${localStorageHelpers.load('AUTH_TOKEN')}`,
		},
	});

	return forward(operation);
});

const client = new ApolloClient({
	link: concat(authMiddleware, httpLink),
	cache: new InMemoryCache(),
});

const App = () => (
	<ApolloProvider client={client}>
		<Layout>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/discover" component={Discover} />
				<Route path="/logout" component={Logout} />
				<Redirect to="/" />
			</Switch>
		</Layout>
	</ApolloProvider>
);

export default withAuthRequired(App);
