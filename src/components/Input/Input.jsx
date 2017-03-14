import React, { Component } from 'react';
import DragDrop from './DragDrop.jsx';
//import '../../styles/App.css';

class Input extends Component {
  constructor(props){
    super(props)
    this.state = {
      url: ''
    }

    this.checkForParentImgExists();
    this.handleChangeImgURL = this.handleChangeImgURL.bind(this);
    this.handleUrlUpdate = this.handleUrlUpdate.bind(this);
  }

  checkForParentImgExists(){
    if (this.props.parentState.imgURL){
      browserHistory.push('/translate');
    }
  }

  handleUrlUpdate(event){
    this.setState({
      url: event.target.value
    });
  }

  handleChangeImgURL(event){
    this.props.handleChangeImgURL(this.state.url);
  }

  render() {
    return (
      <div className="input">
        <div className="url-input">
          <h2>Img Url</h2>
          <input 
            className="url-input-field"
            type="text"
            value={this.state.url}
            onChange={this.handleUrlUpdate}
          />
          <button className="btn url-submit" onClick={this.handleChangeImgURL}>Submit</button>
        </div>
        <DragDrop handleChangeImgURL={this.props.handleChangeImgURL}/>
      </div>
    );
  }
}

export default Input;
