// @flow
import React from 'react';
import {Grid} from 'semantic-ui-react';
import {loader} from 'graphql.macro';
import {useQuery} from 'react-apollo-hooks';
import type {ApolloQueryResult} from 'apollo-client';

import UserInfo from './UserInfo';
import RepositoriesTable from './RepositoriesTable';
import Loader from '../../generic/Loader';
import {type TViewer} from './typedefs';
const query = loader('./gql/query.graphql');

const Home = (props: {||}) => {
	const queryResult: ApolloQueryResult<{viewer: TViewer}> = useQuery(query);

	if (queryResult.loading) return <Loader />;

	return (
		<Grid>
			<Grid.Row>
				<Grid.Column width={4}>
					<UserInfo data={queryResult.data.viewer} />
				</Grid.Column>

				<Grid.Column width={12}>
					<RepositoriesTable data={queryResult.data.viewer.repositories.nodes} />
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
};

export default Home;
