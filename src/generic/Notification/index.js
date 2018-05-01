// @flow
import React from 'react';
import { Message } from 'semantic-ui-react';
import { compose, branch, renderNothing, lifecycle } from 'recompact';

import Portal from '../Portal';
import { NOTIFICATION_TIMEOUT } from '../../settings';
import { withTransitionState } from '../hoc';
import styles from './assets/index.css';

const Notification = (props: {
    color: ?string,
    text: ?string,
    transitionState: 'entering' | 'entered' | 'exiting' | 'exited',
}) => (
    <Portal>
        <Message
            className={[
                styles.Notification,
                styles[`Notification-${props.transitionState}`],
            ].join(' ')}

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
                const timeoutId = setTimeout(() =>
                    this.setState({ isShown: false }), NOTIFICATION_TIMEOUT);

                this.setState({
                    isShown: true,
                    timeoutId,
                });
            }
        },

        componentWillUnmount() {
            clearTimeout(this.props.timeoutId);
            this.setState({ isShown: false });
        },
    }),

    withTransitionState({ inProp: props => props.isShown }),

    branch(
        props => props.transitionState === 'exited',
        renderNothing,
    ),
)(Notification);
