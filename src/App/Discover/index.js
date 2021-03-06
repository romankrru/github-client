// @flow
import React, {useState} from 'react';
import _ from 'lodash';
import {Grid, Loader} from 'semantic-ui-react';
import {loader} from 'graphql.macro';
import {useQuery} from 'react-apollo-hooks';
import {type ApolloQueryResult} from 'apollo-client';

import {FETCHED_ITEMS_LIMIT} from '../../settings';
import transformToGithubQueryString from '../../generic/helpers/transform-to-github-query-string';
import useDebounce from '../../generic/hooks/use-debounce';
import SearchBox from './SearchBox';
import DetailsModal from './DetailsModal';
import Result from './Result';
import Filter from './Filter';
import ItemsCount from './ItemsCount';
import styles from './assets/index.module.css';
import {type TRepo} from './typedefs';
const repositoriesQuery = loader('./gql/repositoriesQuery.graphql');

const defaultFilters = {
	language: 'JavaScript',
	stars: '',
	user: '',
	forks: '',
	size: '',
};

// FIXME:
const isFetchMoreLoading = false;

const Discover = (props: {||}) => {
	const [searchBoxValue, setSearchBoxValue] = useState('');
	const [filters, setFilters] = useState(defaultFilters);
	const debouncedSearchBoxValue = useDebounce(searchBoxValue, 300);
	const debouncedFilters = useDebounce(filters, 300);

	const [detailsModalState, setDetailsModalState] = useState({
		isOpen: false,
		data: null,
	});

	const queryResult: ApolloQueryResult<{
		search?: {edges: Array<{node: TRepo}>},
	}> = useQuery(repositoriesQuery, {
		variables: {
			limit: FETCHED_ITEMS_LIMIT,

			queryString: transformToGithubQueryString({
				search: debouncedSearchBoxValue,
				filters: debouncedFilters,
			}),
		},
	});

	const handleFilterChange = (
		a,
		data: {
			name: $Keys<typeof defaultFilters>,
			value: string,
		},
	) =>
		setFilters({
			...filters,
			[data.name]: data.value,
		});

	const resetFilters = () => setFilters(defaultFilters);

	const openDetailsModal = (data: TRepo) =>
		setDetailsModalState({
			isOpen: true,
			data: data,
		});

	const closeDetailsModal = () =>
		setDetailsModalState({
			isOpen: false,
			data: null,
		});

	const itemsTotalCount: number = _.get(
		queryResult.data,
		'search.repositoryCount',
		0,
	);

	const itemsLoadedCount: number = _.get(queryResult.data, 'search.edges', [])
		.length;

	return (
		<Grid>
			<Grid.Row>
				<Grid.Column>
					<SearchBox
						loading={queryResult.loading}
						value={searchBoxValue}
						onChange={(a, data) => setSearchBoxValue(data.value)}
					/>
				</Grid.Column>
			</Grid.Row>

			<Grid.Row>
				<Grid.Column width={4}>
					<Filter
						filters={filters}
						handleFilterChange={handleFilterChange}
						resetFilters={resetFilters}
						isLoading={queryResult.loading}
						defaultFilters={defaultFilters}
					/>
				</Grid.Column>

				{queryResult.data.search && (
					<Grid.Column width={12}>
						<Result
							data={queryResult.data.search.edges}
							openDetailsModal={openDetailsModal}
						/>

						<Loader
							className={styles.FetchMoreLoader}
							active={isFetchMoreLoading}
							inline="centered"
						/>
					</Grid.Column>
				)}
			</Grid.Row>

			<ItemsCount
				itemsTotalCount={itemsTotalCount}
				itemsLoadedCount={itemsLoadedCount}
			/>

			{detailsModalState.isOpen && <DetailsModal
				close={closeDetailsModal}
				data={detailsModalState.data}
			/>}
		</Grid>
	);
};

export default Discover;
