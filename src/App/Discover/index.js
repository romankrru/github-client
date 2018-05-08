/* eslint-disable */

// @flow
import React from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import { compose, withStateHandlers, lifecycle } from 'recompact';

import { FETCHED_ITEMS_LIMIT } from '../../settings';
import { withDebouncedProps } from '../../generic/hoc';
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

                    <Loader className={styles.FetchMoreLoader} active={props.isFetchMoreLoading} inline='centered' />
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
            handleInputChange: () => (_, data: {
                name: string,
                value: string
            }) => ({ [data.name]: data.value }),

            handleFilterChange: props => (_, data: {
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

    withStateHandlers(
        {isFetchMoreLoading: false},
        {setIsFetchMoreLoading: () => value => ({isFetchMoreLoading: value})}
    ),

    lifecycle({
        componentDidMount() {
            const onDocumentScroll = _.throttle(() => {
                const documentHeight = document.body.scrollHeight
                const screenHeight = document.body.clientHeight
                const scrolledHeight = window.pageYOffset

                if (documentHeight - screenHeight - scrolledHeight <  50) {
                    console.log('should fetch more')
                    // console.log(this.props.data)

                    if (this.props.isFetchMoreLoading) {
                        console.log('already loading');
                        return;
                    }
                        
                    this.props.setIsFetchMoreLoading(true);
                    
                    window.scrollBy({
                        behavior: "smooth",
                        left: 0,
                        top: 100
                    });

                    const cursor = _.last(this.props.data.search.edges).cursor
                    console.log(cursor)     

                    this.props.data.fetchMore({
                        query: repositoriesQuery,

                        variables: {
                            limit: FETCHED_ITEMS_LIMIT,
                            cursor: cursor,
                            queryString: transformToGithubQueryString({
                                search: this.props.searchBoxDebounced,
                                filters: this.props.filtersDebounced,
                            }),
                        },
                        
                        updateQuery: (prevResult, newResult) => {
                            this.props.setIsFetchMoreLoading(false);

                            if (_.isEmpty(newResult.fetchMoreResult)) {
                                return prevResult;
                            }

                            return {
                                ...prevResult,

                                ...{search: {
                                    ...prevResult.search,

                                    ...{
                                        edges: [
                                            ...prevResult.search.edges,
                                            ...newResult.fetchMoreResult.search.edges,
                                        ]
                                    }
                                }}
                            }

                            console.log(prevResult)
                            console.log(newResult)
                        }
                    })
                }

                // this.props.data.fetchMore()
            }, 100);

            document.addEventListener('scroll', onDocumentScroll)
        }
    })
)(Discover);
