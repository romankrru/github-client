import React from 'react';
import { branch, renderNothing }  from 'recompact';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const DetailsModal = props => {
	return (
		<Modal
			open={props.isOpen}
			onClose={props.close}
			size='small'
		>
			<Header content={props.data.name} />
			<Modal.Content>
				<p>{props.data.description}</p>
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