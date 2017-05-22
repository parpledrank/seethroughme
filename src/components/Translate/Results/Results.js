// Results React Component contain dropdown list and translate Results
import React, { Component } from 'react';
import Keyword from './Keyword/Keyword.js';
import TranslateResult from './Translate/TranslateResult.js';

class Results extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="results-container">
        <div className="results-item"><TranslateResult keywords={this.props.keywords} /></div>
      </div>
    )
  }
}

export default Results;