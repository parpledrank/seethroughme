import React, { Component } from 'react';
import '../../styles/App.css';

class Input extends Component {
  constructor(props){
    super(props)
    this.state = {
      url: ''
    }

    this.checkForParentImgExists();
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
            onChange={this.handleUrlUpdate.bind(this)}
          />
          <button className="btn url-submit" onClick={this.handleUrlSubmit.bind(this)}>Submit</button>
        </div> 
      </div>
    );
  }
}

export default Input;
