import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route, Link, browserHistory } from 'react-router';

// import { BrowserRouter, Match, Miss } from 'react-router-dom';
import Input from './components/Input/Input.jsx';
import Translate from './components/Translate/Translate.js'
import './styles/index.css';
import App from './components/app.jsx'

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={App} />
    <Route path='/translate' component={Translate} />
  </Router>
), document.getElementById('container'));
