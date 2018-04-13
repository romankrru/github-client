import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import Auth from './Auth'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import App from './App';

const app = (
  <Router>
    <Fragment>
      <Route path="/auth" exact component={Auth} />
      <Route path="/" component={App} />
    </Fragment>
  </Router>
);

ReactDOM.render(
  app,
  document.getElementById('root')
);
