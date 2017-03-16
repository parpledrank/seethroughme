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
      <div>
        <div><Keyword keywords={this.props.keywords} /></div>
        <div><TranslateResult keywords={this.props.keywords} /></div>
      </div>
    )
  }
}

export default Results;