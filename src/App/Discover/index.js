// @flow
import React from 'react';
import _ from 'lodash';
import { Grid, Loader } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import { compose, withStateHandlers } from 'recompact';

import { FETCHED_ITEMS_LIMIT } from '../../settings';
import { withDebouncedProps, withInfiniteScroll } from '../../generic/hoc';
import { transformToGithubQueryString } from '../../generic/helpers';
import SearchBox from './SearchBox';
import DetailsModal from './DetailsModal';
import Result from './Result';
import Filter from './Filter';
import repositoriesQuery from './gql/repositoriesQuery.graphql';
import styles from './assets/index.css';
import type { TRepo, TFilters } from './typedefs';

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
    isFetchMoreLoading: boolean,
    closeDetailsModal: Function,
    detailsModalData: ?TRepo,
    openDetailsModal: Function,
    searchBox: string,
    handleInputChange: Function,
    handleFilterChange: Function,
    resetFilters: Function,
    filters: TFilters,
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

        {props.data.search &&
            <Grid.Row>
                <Grid.Column width={4}>
                    <Filter
                        filters={props.filters}
                        handleFilterChange={props.handleFilterChange}
                        resetFilters={props.resetFilters}
                        isLoading={props.data.loading}
                        defaultFilters={defaultFilters}
                    />
                </Grid.Column>

                <Grid.Column width={12}>
                    <Result
                        data={props.data.search.edges}
                        openDetailsModal={props.openDetailsModal}
                    />

                    <Loader className={styles.FetchMoreLoader} active={props.isFetchMoreLoading} inline="centered" />
                </Grid.Column>
            </Grid.Row>
        }
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
            handleInputChange: () => (_a, data: {
                name: string,
                value: string
            }) => ({ [data.name]: data.value }),

            handleFilterChange: props => (_a, data: {
                name: string,
                value: string,
            }) => ({
                filters: {
                    ...props.filters,
                    [data.name]: data.value,
                },
            }),

            resetFilters: () => () => ({ filters: defaultFilters }),

            openDetailsModal: () => (data: TRepo) => ({
                isDetailsModalOpen: true, detailsModalData: data,
            }),

            closeDetailsModal: () => () => ({ isDetailsModalOpen: false, detailsModalData: null }),
        },
    ),

    // this is the easiest way to debounce graphql query
    withDebouncedProps({ debounce: 300, propNames: ['searchBox', 'filters'] }),

    graphql(repositoriesQuery, {
        options: props => ({
            variables: {
                limit: FETCHED_ITEMS_LIMIT,
                queryString: transformToGithubQueryString({
                    search: props.searchBoxDebounced,
                    filters: props.filtersDebounced,
                }),
            },
        }),
    }),

    withInfiniteScroll({
        query: repositoriesQuery,

        variables: props => ({
            limit: FETCHED_ITEMS_LIMIT,
            cursor: _.last(props.data.search.edges).cursor,

            queryString: transformToGithubQueryString({
                search: props.searchBoxDebounced,
                filters: props.filtersDebounced,
            }),
        }),

        update: (prevResult, newResult) => ({
            ...prevResult,

            ...{
                search: {
                    ...prevResult.search,

                    ...{
                        edges: [
                            ...prevResult.search.edges,
                            ...newResult.fetchMoreResult.search.edges,
                        ],
                    },
                },
            },
        }),
    }),
)(Discover);
