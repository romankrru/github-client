// @flow
import React from 'react';
import { branch, renderNothing }  from 'recompact';
import { Button, Header, Icon, Modal, List, Table } from 'semantic-ui-react';
import moment from 'moment';

import { DATE_FORMAT_WITH_HOURS } from '../../../settings';

const DetailsModal = (props: {
	isOpen: boolean,
	close: Function,

	data: {
		name: string,
		description: string,
		forks: {totalCount: number},
		stargazers: {totalCount: number},
		updatedAt: string,
		languages: {edges: Array<{node: {name: string}}>}
	},
}) => {
	return (
		<Modal
			open={props.isOpen}
			onClose={props.close}
			size='small'
		>
			<Header content={props.data.name} />

			<Modal.Content>
				<p>{props.data.description}</p>

				<Table>
					<Table.Body>
						<Table.Row>
							<Table.Cell>Forks</Table.Cell>
							<Table.Cell>{props.data.forks.totalCount}</Table.Cell>							
						</Table.Row>

						<Table.Row>
							<Table.Cell>Stars</Table.Cell>
							<Table.Cell>{props.data.stargazers.totalCount}</Table.Cell>
						</Table.Row>

						<Table.Row>
							<Table.Cell>Updated at</Table.Cell>
							<Table.Cell>{moment(props.data.updatedAt).format(DATE_FORMAT_WITH_HOURS)}</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table>

				<p>Languages:</p>

				<List bulleted>
					{props.data.languages.edges.map(lang => (
						<List.Item key={lang.node.name}>{lang.node.name}</List.Item>					
					))}
				</List>
			</Modal.Content>

			<Modal.Actions>
				<Button color='green' onClick={props.close} inverted>
					<Icon name='checkmark' /> Got it
					</Button>
			</Modal.Actions>
		</Modal>
	)
};

export default branch(
	props => !props.data,
	renderNothing,
)(DetailsModal);