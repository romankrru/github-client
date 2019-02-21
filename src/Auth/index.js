// @flow
import React, {useState, useEffect} from 'react';
import {Form, Input, Button} from 'semantic-ui-react';
import base64 from 'base-64';
import type {RouterHistory} from 'react-router';

import {
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	AUTH_URL_PATH,
} from '../settings';

import {useNotification} from '../generic/NotificationManager';
import {localStorageHelpers} from '../generic/helpers';
import styles from './assets/index.module.css';

const getToken = (data: {
	login: string,
	password: string,
}): Promise<string | void> => {
	const bytes = `${data.login.trim()}:${data.password.trim()}`;
	const encoded = base64.encode(bytes);

	return fetch(AUTH_URL_PATH, {
		method: 'POST',

		headers: {
			Authorization: `Basic ${encoded}`,
			'User-Agent': 'GitHub Issue Browser',
			'Content-Type': 'application/json; charset=utf-8',
			Accept: 'application/vnd.github.inertia-preview+json',
		},

		body: JSON.stringify({
			client_id: GITHUB_CLIENT_ID,
			client_secret: GITHUB_CLIENT_SECRET,
			scopes: ['user', 'repo', 'read:org'],
			note: 'not abuse',
		}),
	})
		.then(res => res.json())
		.then(json => json.token);
};

const Auth = (props: $Exact<{history: RouterHistory}>) => {
	const notification = useNotification();
	const [formState, setFormState] = useState({login: '', password: ''});
	const [isValid, setIsValid] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const onChange = (
		_,
		data: {name: $Keys<typeof formState>, value: string},
	) =>
		setFormState({
			...formState,
			[data.name]: data.value,
		});

	const signIn = () => {
		setIsLoading(true);

		getToken({login: formState.login, password: formState.password})
			.then(token => {
				if (!token) {
					setFormState({...formState, password: ''});

					notification.error({
						message: 'Invalid password or email.',
					});

					return;
				}

				localStorageHelpers.save('AUTH_TOKEN', token);
				props.history.replace('/');
			})

			.catch(err => {
				console.error(err);

				notification.error({
					message: 'Some error occurred. Please try again.',
				});
			})

			.finally(() => setIsLoading(false));
	};

	useEffect(() => {
		setIsValid(formState.password.length > 0 && formState.login.length > 0);
	}, [formState]);

	return (
		<div className={styles.Login}>
			<h1>Sign in via Github</h1>

			<Form>
				<Form.Field
					control={Input}
					label="Login"
					name="login"
					placeholder="Login"
					onChange={onChange}
					value={formState.login}
				/>

				<Form.Field
					control={Input}
					label="Password"
					name="password"
					placeholder="Password"
					onChange={onChange}
					type="password"
					value={formState.password}
				/>

				<Button
					onClick={signIn}
					primary
					className={styles.Button}
					disabled={!isValid || isLoading}
					loading={isLoading}
				>
					Sign in
				</Button>
			</Form>
		</div>
	);
};

export default Auth;
