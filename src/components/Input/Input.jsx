import React, { Component } from 'react';
import DragDrop from './DragDrop.jsx';
import { browerHistory } from 'react-router';
//import '../../styles/App.css';

class Input extends Component {
  constructor(props){
    super(props)
    this.state = {
      url: ''
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleUrlUpdate = this.handleUrlUpdate.bind(this);
    console.log(this.props.handleImageSubmission)
  }

  handleUrlUpdate(event){
    this.setState({
      url: event.target.value
    });
  }

  handleClick(event){
    this.props.changeParentUrl(this.state.url);
    this.setState({
      url: ''
    });
  }

  render() {
    return (
      <div className="input">
        <div className="url-input">
          <h2>Submit Picture</h2>
            <input 
              className="url-input-field"
              type="text"
              value={this.state.url}
              onChange={this.handleUrlUpdate}
            />
          <button className="btn url-submit" onClick={this.handleClick}>Submit</button>
        </div>

        <DragDrop changeParentUrl={this.props.changeParentUrl} />
      </div>
    );
  }
}

export default Input;
