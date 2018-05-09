// @flow
import React from 'react';
import { branch, renderNothing } from 'recompact';

import Portal from '../../../generic/Portal';
import styles from './assets/index.css';

const ItemsCount = (props: {
    itemsLoadedCount: number,
    itemsTotalCount: number,
}) => (
    <Portal>
        <div className={styles.ItemsCount}>{props.itemsLoadedCount} of {props.itemsTotalCount}</div>
    </Portal>
);

export default branch(
    props => !props.itemsLoadedCount && !props.itemsTotalCount,
    renderNothing,
)(ItemsCount);
