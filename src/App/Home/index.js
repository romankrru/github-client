// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import { Grid } from 'semantic-ui-react';
import { loader } from 'graphql.macro';
import { compose, branch, renderComponent } from 'recompose';

import UserInfo from './UserInfo';
import RepositoriesTable from './RepositoriesTable';
import Loader from '../../generic/Loader';
import type { TViewer } from './typedefs';

const query = loader('./gql/query.graphql');

const Home = (props: {
    data: {viewer: TViewer},
}) => (
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
