/* eslint-disable */
import React from 'react';
import { graphql } from 'react-apollo';
import { Grid } from 'semantic-ui-react';
import { compose, branch, renderComponent } from 'recompact';

import query from './gql/query.graphql';
import UserInfo from './UserInfo';
import RepositoriesTable from './RepositoriesTable';
import Loader from '../../generic/Loader';

const Home = props => (
    <Grid>
        <Grid.Row>
            <Grid.Column width={4}>
                <UserInfo data={props.data.viewer} />
            </Grid.Column>

            <Grid.Column width={12}>
                <RepositoriesTable data={props.data.viewer.repositories.nodes} />
            </Grid.Column>
        </Grid.Row>
    </Grid>
);

export default compose(
    graphql(query),

    branch(
        props => props.data.loading,
        renderComponent(Loader),
    ),
)(Home);
