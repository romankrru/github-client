// @flow
import React from 'react';
import {Form, Input, Button} from 'semantic-ui-react';
import {compose, withStateHandlers, withHandlers, withPropsOnChange, type HOC} from 'recompose';
import base64 from 'base-64';
import type {RouterHistory} from 'react-router';

import {GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, AUTH_URL_PATH} from '../settings';
import {localStorageHelpers} from '../generic/helpers';
import Notification from '../generic/Notification';
import styles from './assets/index.module.css';

const Auth = props => (
	<div className={styles.Login}>
		<h1>Sign in via Github</h1>

		<Form>
			<Form.Field
				control={Input}
				label="Login"
				name="login"
				placeholder="Login"
				onChange={props.onChange}
				value={props.form.login}
			/>

			<Form.Field
				control={Input}
				label="Password"
				name="password"
				placeholder="Password"
				onChange={props.onChange}
				type="password"
				value={props.form.password}
			/>

			<Button
				onClick={props.signIn}
				primary
				className={styles.Button}
				disabled={!props.isValid || props.isLoading}
				loading={props.isLoading}
			>
				Sign in
			</Button>
		</Form>

		<Notification shownAt={props.errorNotificationShownAt} color="red" text="Invalid login or password" />
	</div>
);

const enhance: HOC<*, {history: RouterHistory}> = compose(
	withStateHandlers(
		{
			form: {login: '', password: ''},
			errorNotificationShownAt: '',
			isLoading: false,
		},

		{
			onChange: props => (_, data: {name: string, value: string}) => ({
				form: {
					...props.form,
					[data.name]: data.value,
				},
			}),

			resetPassword: props => () => ({
				form: {
					...props.form,
					password: '',
				},
			}),

			showErrorNotification: () => () => ({errorNotificationShownAt: new Date().toString()}),
			setIsLoading: () => value => ({isLoading: value}),
		},
	),

	withHandlers({
		signIn: props => () => {
			const bytes = `${props.form.login.trim()}:${props.form.password.trim()}`;
			const encoded = base64.encode(bytes);

			props.setIsLoading(true);

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

				.then(json => {
					props.setIsLoading(false);

					if (!json.token) {
						props.resetPassword();
						props.showErrorNotification();
						return;
					}

					localStorageHelpers.save('AUTH_TOKEN', json.token);
					props.history.replace('/');
				});
		},
	}),

	withPropsOnChange(['form'], props => ({isValid: props.form.password.length > 0 && props.form.login.length > 0})),
);

export default enhance(Auth);
