import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route, Link, browserHistory } from 'react-router';

// import { BrowserRouter, Match, Miss } from 'react-router-dom';
import Input from './components/Input/Input.js';
import Translate from './components/Translate/Translate.js'
import './styles/index.css';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={Input} />
    <Route path='/translate' component={Translate} />
  </Router>
), document.getElementById('container'));
