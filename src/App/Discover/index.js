import React from 'react';
import { Grid } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import { compose, withStateHandlers } from 'recompact';

import { withDebouncedProps } from '../../generic/hoc';
import { transformToGithubQueryString } from '../../generic/helpers';
import SearchBox from './SearchBox';
import Result from './Result';
import Filter from './Filter';
import query from './gql/query';

const defaultFilters = {
    language: 'JavaScript',
    stars: '',
    user: '',
    forks: '',
    size: '',
};

const Discover = props => {
    return (
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <SearchBox
                        loading={props.data.loading}
                        value={props.searchBox}
                        onChange={props.handleInputChange}
                    />
                </Grid.Column>
            </Grid.Row>

            {props.data.search && <Grid.Row>
                <Grid.Column width={4}>
                    <Filter
                        filters={props.filters}
                        handleFilterChange={props.handleFilterChange}
                        resetFilters={props.resetFilters}
                    />
                </Grid.Column>

                <Grid.Column width={12}>
                    <Result
                        data={props.data.search.edges}
                    />
                </Grid.Column>
            </Grid.Row>}
        </Grid>
    );
};

export default compose(
    withStateHandlers(
        {
            searchBox: '',
            filters: defaultFilters,
        },

        {
            handleInputChange: () => (_, data) => ({[data.name]: data.value}),

            handleFilterChange: props => (_, data) => ({
                filters: {
                    ...props.filters,
                    [data.name]: data.value,  
                },
            }),

            resetFilters: () => () => ({filters: defaultFilters}),
        },
    ),

    // this is the easiest way to debounce graphql query
    withDebouncedProps({ debounce: 300, propNames: ['searchBox', 'filters'] }),

    graphql(query, {
        options: props => ({variables: {"queryString": transformToGithubQueryString({
            search: props.searchBoxDebounced,
            filters: props.filtersDebounced,
        })}}),
    }),
)(Discover);