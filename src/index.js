// @flow
import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import {NotificationProvider} from './generic/NotificationManager';
import Auth from './Auth';
import App from './App';
import 'semantic-ui-css/semantic.min.css';

const app = (
	<NotificationProvider>
		<Router>
			<Fragment>
				<Route path="/auth" exact component={Auth} />
				<Route path="/" component={App} />
			</Fragment>
		</Router>
	</NotificationProvider>
);

const root = document.getElementById('root');
if (root) ReactDOM.render(app, root);
