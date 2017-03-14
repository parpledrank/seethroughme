import React from 'react';
import Input from './Input/Input.jsx';
import Translate from './Translate/Translate.js';
import axios from 'axios';
import { browserHistory } from 'react-router';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: "",
      keywords: []
    }

    this.handleImageSubmission = this.handleImageSubmission.bind(this);
    this.changeParentUrl = this.changeParentUrl.bind(this);
    this.fetchIBM = this.fetchIBM.bind(this);
  }

  handleImageSubmission() {
    if (this.state.imageURL.length > 0) {
      console.log('State changed to: ', this.state.imageURL);
      browserHistory.push('/translate');
    }
  }

  changeParentUrl(url) {
    this.setState({imageURL: url}, () => {
      this.handleImageSubmission();
    });
  }

  fetchIBM() {
    // if the image exists (has been updated by user giving img url or drop down a image) 
    if (this.state.imageURL) {
      axios.post('/api/upload', {url: this.state.imageURL})
      .then(res => {
        console.log("In App.jsx, the response from request server /api/upload ", res);
        this.setState = {
          keywords : res
        }
      })
      .catch(err => {
        console.log("In App.jsx, request server /api/upload");
      })
    }
  }

  render() {
    return (
      <div className="AppClass">
        <Input 
        parentUrl={this.state.parentUrl} 
        changeParentUrl={this.changeParentUrl} 
        fetchIBM={this.fetchIBM} 
        />
      </div>
    )
  }

}

export default App;