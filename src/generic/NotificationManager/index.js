import React, {useContext, useReducer} from 'react';
import cn from 'classnames';
import { Message } from 'semantic-ui-react';

import Portal from '../Portal';
import styles from './assets/index.module.css';


let globalId = 0;
const NotificationContext = React.createContext();

const actionsTypes = {
	SHOW: 'SHOW',
	CLEAR: 'CLEAR',
	CLEAR_ALL: 'CLEAR_ALL',
};

const notificationReducer = (state, action) => {
	switch (action.type) {
		case actionsTypes.SHOW:
			return action.isHighPriority
				? [action.notification, ...state]
				: [...state, action.notification];

		case actionsTypes.CLEAR:
			return state.filter(item => action.id !== item.id);

		case actionsTypes.CLEAR_ALL:
			return [];

		default:
			return state;
	}
};

const NotificationProvider = props => {
	const [notificationQueue, notificationDispatch] = useReducer(
		notificationReducer,
		[],
	);

	const createNotification = status => params => {
		const id = globalId;

		notificationDispatch({
			type: actionsTypes.SHOW,
			isHighPriority: params.isHighPriority,

			notification: {
				message: params.message,
				id: id,
				status: status,
			},
		});

		setTimeout(
			() => notificationDispatch({type: actionsTypes.CLEAR, id: id}),
			4000,
		);

		globalId++;
	};

	return (
		<NotificationContext.Provider
			value={React.useMemo(
				() => ({
					info: createNotification('info'),
					warning: createNotification('warning'),
					error: createNotification('error'),
					success: createNotification('success'),
					clearAll: () =>
						notificationDispatch({type: actionsTypes.CLEAR_ALL}),
				}),

				[],
			)}
		>
			{props.children}

			<Portal>
				<div>
					{notificationQueue.map((item, idx) => (
						<Message
							key={item.id}
							className={cn(styles.Notification)}
							color="red"
						>
							{item.message}
						</Message>


					))}
				</div>
			</Portal>
		</NotificationContext.Provider>
	);
};

const useNotification = () => useContext(NotificationContext);

export {useNotification, NotificationProvider};
