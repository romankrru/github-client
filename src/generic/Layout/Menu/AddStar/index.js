// @flow
import React, {useState, Fragment, useEffect} from 'react';
import produce from 'immer';
import {Button, Confirm} from 'semantic-ui-react';
import {type ApolloQueryResult} from 'react-apollo';
import {useQuery, useMutation} from 'react-apollo-hooks';
import {loader} from 'graphql.macro';

const query = loader('./gql/query.graphql');
const addStarMutation = loader('./gql/add-star.graphql');
const removeStarMutation = loader('./gql/remove-star.graphql');

type TRepository = {
	id: string,

	stargazers: {
		nodes: Array<{login: string, id: string}>,
	},
};

type TViewer = {
	id: string,
	login: string,
};

type TCache = {
	viewer: TViewer,
	repository: TRepository,
};

const AddStar = (props: $Exact<{}>) => {
	const [isConfirmationShown, setIsConfirmationShown] = useState(false);
	const [isUserInformed, setIsUserInformed] = useState(false);
	const [isStarred, setIsStared] = useState(false);

	const queryResult: ApolloQueryResult<{
		repository?: TRepository,
		viewer?: TViewer,
	}> = useQuery(query);

	const repo = queryResult.data.repository;
	const viewer = queryResult.data.viewer;

	const addStar = useMutation(addStarMutation, {
		variables: {
			id: repo && repo.id,
		},

		optimisticResponse: {
			addStar: {
				starrable: {
					id: repo && repo.id,
					__typename: 'Repository',
				},

				__typename: 'AddStarPayload',
			},
		},

		update: (proxy, mutationResult) => {
			const dataFromCache: TCache = proxy.readQuery({query: query});

			const updated = produce(dataFromCache, draft => {
				draft.repository.stargazers.nodes.push({
					id: dataFromCache.viewer.id,
					login: dataFromCache.viewer.login,
					__typename: 'User',
				});
			});

			proxy.writeQuery({query: query, data: updated});
		},
	});

	const removeStar = useMutation(removeStarMutation, {
		variables: {
			id: repo && repo.id,
		},

		optimisticResponse: {
			removeStar: {
				starrable: {
					id: repo && repo.id,
					__typename: 'Repository',
				},

				__typename: 'RemoveStarPayload',
			},
		},

		update: (proxy, mutationResult) => {
			const dataFromCache: TCache = proxy.readQuery({query: query});

			const updated = produce(dataFromCache, draft => {
				draft.repository.stargazers.nodes.splice(
					draft.repository.stargazers.nodes.findIndex(
						stargazer => stargazer.id === dataFromCache.viewer.id,
					),
					1,
				);
			});

			proxy.writeQuery({query: query, data: updated});
		},
	});

	const onClick = () => {
		if (isStarred) {
			removeStar();
			setIsUserInformed(true);
			return;
		}

		if (!isUserInformed) {
			setIsConfirmationShown(true);
			return;
		}

		addStar();
	};

	const onConfirm = () => {
		setIsConfirmationShown(false);
		addStar();
	};

	useEffect(() => {
		if (!isUserInformed && isConfirmationShown) setIsUserInformed(true);
	}, [isConfirmationShown, isUserInformed]);

	useEffect(() => {
		if (!repo || !viewer) return;

		const isStarred = repo.stargazers.nodes.some(
			stargazer => stargazer.id === viewer.id,
		);

		setIsStared(isStarred);
	}, [repo]);

	return (
		<Fragment>
			<Button
				onClick={onClick}
				circular
				icon="star"
				color={isStarred ? 'yellow' : 'grey'}
			/>

			<Confirm
				header="Add star"
				content="This action will add star for this project on Github. Are you sure?"
				open={isConfirmationShown}
				onCancel={() => setIsConfirmationShown(false)}
				onConfirm={onConfirm}
			/>
		</Fragment>
	);
};

export default AddStar;
