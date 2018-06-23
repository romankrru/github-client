// @flow

import React from 'react';
import _ from 'lodash';
import { compose, branch, renderNothing, lifecycle, withStateHandlers, withHandlers } from 'recompact';

import { withTransitionState } from '../../hoc';
import styles from './assets/index.css';
import type { TTransitionState } from '../../typedefs';

let onScroll;

const BackToTop = (props: {
    toTop: Function,
    transitionState: TTransitionState,
}) => (
    <button
        onClick={props.toTop}

        className={[
            styles.BackToTop,
            styles[`BackToTop-${props.transitionState}`],
        ].join(' ')}
    >
        <div className={styles.text}>Back To Top</div>
    </button>
);

export default compose(
    withStateHandlers(
        { isShown: false },
        { setIsShown: () => (value: boolean) => ({ isShown: value }) },
    ),

    lifecycle({
        componentDidMount() {
            const windowHeight = window.innerHeight;

            onScroll = _.throttle(() => {
                const shouldBeVisible = window.scrollY > (windowHeight / 1.3);

                if (shouldBeVisible && !this.props.isShown) {
                    this.props.setIsShown(true);
                }

                if (!shouldBeVisible && this.props.isShown) {
                    this.props.setIsShown(false);
                }
            }, 100);

            document.addEventListener('scroll', onScroll);
        },

        componentWillUnmount() {
            document.removeEventListener('scroll', onScroll);
        },
    }),

    withHandlers({
        toTop: () => () => window.scrollTo({
            behavior: 'smooth',
            left: 0,
            top: 0,
        }),
    }),

    withTransitionState({ inProp: props => props.isShown }),

    branch(
        props => props.transitionState === 'exited',
        renderNothing,
    ),
)(BackToTop);
