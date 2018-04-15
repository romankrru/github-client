import React from 'react';
import { Message } from 'semantic-ui-react';
import { compose, branch, renderNothing, lifecycle } from 'recompact';

import Portal from '../Portal';
import {NOTIFICATION_TIMEOUT} from '../../settings';
import styles from './assets/index.css';


const Notification = (props) => (
    <Portal>
        <Message
            className={styles.Notification}
            color={props.color}
        >
            {props.text}
        </Message>
    </Portal>
);

export default compose(
    lifecycle({
        // FIXME: update to getDerivedStateFromProps
        componentWillReceiveProps(nextProps) {
            if (nextProps.shownAt && nextProps.shownAt !== this.props.shownAt) {
                const timeoutId = setTimeout(() => this.setState({isShown: false}), NOTIFICATION_TIMEOUT);

                return this.setState({
                    isShown: true,
                    timeoutId: timeoutId,
                });
            }
        },

        componentWillUnmount() {
            clearTimeout(this.props.timeoutId);
            this.setState({isShown: false});
        },
    }),

    branch(
        props => !props.isShown,
        renderNothing,
    ),
)(Notification);