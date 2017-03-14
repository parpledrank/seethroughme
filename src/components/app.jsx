import React from 'react';
import Input from './Input/Input.js';
import Translate from './Translate/Translate.js';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgURL: "",
      imb_results: []
    }

    this.handleChangeImgURL = this.handleChangeImgURL.bind(this);
    this.handleFetchIBMResults = this.handleFetchIBMResults.bind(this);
  }

  handleChangeImgURL(url) {
    this.setState({imgURL: url});
  }

  handleFetchIBMResults() {
    // if the image exists (has been updated by user giving img url or drop down a image) 
    if (this.state.imgURL) {
      axios.post('/api/upload', {url: this.state.imgURL})
      .then(res => {
        console.log("In App.jsx, the response from request server /api/upload ", res);
        this.setState = {
          img_results : res
        }
      })
      .catch(err => {
        console.log("In App.jsx, request server /api/upload");
      })
    }
  }

  render() {
    <div className="AppClass">
      <Input handleChangeImgURL={this.handleChangeImgURL} handleFetchIBMResults={this.handleFetchIBMResults} parentState={this.state} />
    </div>
  }

}