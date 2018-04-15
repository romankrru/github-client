import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Auth from './Auth'
import App from './App';
import Logout from './Logout';

const app = (
  <Router>
    <Fragment>
      <Route path="/auth" exact component={Auth} />
      <Route path="/logout" exact component={Logout} />
      <Route path="/" component={App} />
    </Fragment>
  </Router>
);

ReactDOM.render(
  app,
  document.getElementById('root')
);
