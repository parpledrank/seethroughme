import React, { Component } from 'react';
import ImageView from './ImageView/ImageView.js';
import Results from './Results/Results.js';
import TranslateResult from './Results/Translate/TranslateResult.js';
import { browserHistory } from 'react-router';

class Translate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keywords: []
    }

    this.componentDidMount = this.componentDidMount.bind(this);
    this.onBackButtonEvent = this.onBackButtonEvent.bind(this);
  }

  componentDidMount() {
    window.onpopstate = this.onBackButtonEvent;
    this.setState({
      keywords: this.props.keywords
    });
  }

  onBackButtonEvent(e) {
    e.preventDefault();
    browserHistory.push('/');
  }

  render() {
    return (
      <div className="translate-container">
        <div className="translate-header">
          <a className="translate-link" href="http://seethroughme.co">see through me</a>
        </div>

        <TranslateResult keywords={this.state.keywords} />
      </div>
    );
  }
}

export default Translate;
