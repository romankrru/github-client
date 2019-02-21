// @flow
import React from 'react';

import Portal from '../../../generic/Portal';
import styles from './assets/index.module.css';

const ItemsCount = (props: {|
	itemsLoadedCount: number,
	itemsTotalCount: number,
|}) => {
	if (!props.itemsLoadedCount && !props.itemsTotalCount) return null;

	return (
		<Portal>
			<div className={styles.ItemsCount}>
				{props.itemsLoadedCount} of {props.itemsTotalCount}
			</div>
		</Portal>
	);
};

export default ItemsCount;
