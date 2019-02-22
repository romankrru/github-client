// @flow
import React from 'react';
import _ from 'lodash';
import {Card, Icon, Image} from 'semantic-ui-react';

import styles from './assets/index.module.css';
import {type TRepo} from '../typedefs';

const Result = (props: {|
	openDetailsModal: Function,
	data: Array<{node: TRepo}>,
|}) => (
	<Card.Group itemsPerRow={3}>
		{props.data.map(edge => (
			<Card key={edge.node.id}>
				<Card.Content
					onClick={() => props.openDetailsModal(edge.node)}
					className={styles.CardHeader}
				>
					<Image
						floated="right"
						size="mini"
						src={edge.node.owner.avatarUrl}
						alt={edge.node.owner.login}
					/>

					<Card.Header>{edge.node.name}</Card.Header>
				</Card.Content>

				<Card.Content
					className={styles.CardDescription}
					description={_.truncate(edge.node.description, {
						length: 90,
					})}
				/>

				{edge.node.languages.edges[0] && (
					<Card.Content extra>
						{edge.node.languages.edges[0].node.name} {' | '}
						<Icon name="star" /> {edge.node.stargazers.totalCount}{' '}
						{' | '}
						<Icon name="fork" /> {edge.node.forks.totalCount}
					</Card.Content>
				)}
			</Card>
		))}
	</Card.Group>
);

export default Result;
