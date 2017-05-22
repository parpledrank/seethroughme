import React, { Component } from 'react';
import ImageView from './ImageView/ImageView.js';
import Results from './Results/Results.js';

class Translate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keywords: []
    }

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.setState({
      keywords: this.props.keywords
    });
  }

  render() {
    return (
      <div className="translate-container">
        <div className="translate-header">
          <a className="translate-link" href="http://seethroughme.co">see through me</a>
        </div>
        <div className="translate-components">
          <div className="image-div"><ImageView imgURL={this.props.imgURL} /></div>
          <div className="results-div"><Results keywords={this.state.keywords}/></div>
        </div>
      </div>
    );
  }
}

export default Translate;
