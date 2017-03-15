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
    console.log(this.props);
    this.setState({
      keywords: this.props.keywords
    });
  }

  render() {
    return (
      <div>
        <div>Translate</div>
        <div><ImageView imgURL={this.props.imgURL} /></div>
        <div><Results keywords={this.state.keywords}/></div>
      </div>
    );
  }
}

export default Translate;
