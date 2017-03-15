import React, { Component } from 'react';
import ImageView from './ImageView/Imageview';
import Results from './Results/Results';

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
        <div><ImageView /></div>
        <div><Results keywords={this.state.keywords}/></div>
      </div>
    );
  }
}

export default Translate;
