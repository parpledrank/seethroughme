import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route, Link, browserHistory } from 'react-router';

// import { BrowserRouter, Match, Miss } from 'react-router-dom';
import Input from './components/Input/Input.jsx';
import Translate from './components/Translate/Translate.js'
import './styles/index.css';
import App from './components/app.jsx'

class Root extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keywords: []
    }

    this.setRootKeywords = this.setRootKeywords.bind(this);
  }

  setRootKeywords(keywords) {
    this.setState({ keywords }, () => {
      browserHistory.push('/translate');
    })
  }

  render() {
    const { children } = this.props;

    return (
      <div>{ children && React.cloneElement(children, { setRootKeywords: this.setRootKeywords, keywords: this.state.keywords })}</div>
    )
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={Root}>
      <IndexRoute component={App} />
      <Route path='/translate' component={Translate}>
      </Route>
    </Route>
  </Router>
), document.getElementById('container'));
