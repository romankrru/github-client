// @flow
import React from 'react';
import {Icon, Table} from 'semantic-ui-react';
import moment from 'moment';

import type {TRepo} from '../typedefs';

const RepositoriesTable = (props: {|data: Array<TRepo>|}) => (
	<Table celled striped>
		<Table.Header>
			<Table.Row>
				<Table.HeaderCell colSpan="3">Your repositories</Table.HeaderCell>
			</Table.Row>
		</Table.Header>

		<Table.Body>
			{props.data.map(repo => (
				<Table.Row key={repo.id}>
					<Table.Cell collapsing>
						<Icon name={repo.isFork ? 'fork' : 'folder'} />
					</Table.Cell>

					<Table.Cell>{repo.name}</Table.Cell>

					<Table.Cell collapsing textAlign="right">
						Created{' '}

						{moment(repo.createdAt)
							.startOf('day')
							.fromNow()}
					</Table.Cell>
				</Table.Row>
			))}
		</Table.Body>
	</Table>
);

export default RepositoriesTable;
