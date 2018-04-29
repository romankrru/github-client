// @flow
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import { compose, withStateHandlers } from 'recompact';

import { withDebouncedProps } from '../../generic/hoc';
import { transformToGithubQueryString } from '../../generic/helpers';
import SearchBox from './SearchBox';
import DetailsModal from './DetailsModal';
import Result from './Result';
import Filter from './Filter';
import query from './gql/query.graphql';
import type { TRepo } from './typedefs';

const defaultFilters = {
    language: 'JavaScript',
    stars: '',
    user: '',
    forks: '',
    size: '',
};

const Discover = (props: {
    data: {
        loading: boolean,
        search?: { edges: Array<{node: TRepo}> },
    },

    isDetailsModalOpen: boolean,
    closeDetailsModal: Function,
    detailsModalData?: TRepo,
    openDetailsModal: Function,
    searchBox: string,
    handleInputChange: Function,
    handleFilterChange: Function,
    resetFilters: Function,
    filters: { [filter_name: string]: string },
}) => (
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

        <DetailsModal
            isOpen={props.isDetailsModalOpen}
            close={props.closeDetailsModal}
            data={props.detailsModalData}
        />

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
                    openDetailsModal={props.openDetailsModal}
                />
            </Grid.Column>
        </Grid.Row>}
    </Grid>
);

export default compose(
    withStateHandlers(
        {
            searchBox: '',
            filters: defaultFilters,

            isDetailsModalOpen: false,
            detailsModalData: null,
        },

        {
            handleInputChange: () => (_, data: {
                name: string,
                value: string
            }) => ({[data.name]: data.value}),

            handleFilterChange: props => (_, data: {
                name: string,
                value: string,
            }) => ({
                filters: {
                    ...props.filters,
                    [data.name]: data.value,
                },
            }),

            resetFilters: () => () => ({filters: defaultFilters}),

            openDetailsModal: () => (data: TRepo) => ({ isDetailsModalOpen: true, detailsModalData: data }),
            closeDetailsModal: () => () => ({ isDetailsModalOpen: false, detailsModalData: null }),
        },
    ),

    // this is the easiest way to debounce graphql query
    withDebouncedProps({ debounce: 300, propNames: ['searchBox', 'filters'] }),

    graphql(query, {
        options: props => ({variables: {queryString: transformToGithubQueryString({
            search: props.searchBoxDebounced,
            filters: props.filtersDebounced,
        })}}),
    }),
)(Discover);