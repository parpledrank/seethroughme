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

  componentDidUpdate() {
    console.log('hello');
  }

  handleImageSubmission() {
    if (this.state.imageURL.length > 0) {
      console.log('State changed to: ', this.state.imageURL);
      this.fetchIBM(success => {
        if (success) {
          console.log("fetchIBM success the state.keywords ", this.state.keywords);
          this.props.setRootKeywords(this.state.keywords)
        } else {
          console.log("fetchIBM failed");
        }
      });

    }
  }

  changeParentUrl(url) {
    this.setState({ imageURL: url }, () => {
      this.props.setRootUrl(this.state.imageURL);
      this.handleImageSubmission();
    });
  }

  // request server /api/upload to receive the ibm results
  // allow passing callback
  fetchIBM(cb) {
    // if the image exists (has been updated by user giving img url or drop down a image) 
    if (this.state.imageURL) {
      axios.post('/api/upload', { url: this.state.imageURL })
        .then(res => {
          this.setState({ keywords: res.data }, () => {
            cb(true);
          })

        })
        .catch(err => {
          console.log("In App.jsx, request server /api/upload");
          cb(false);
        })
    }
  }

  render() {
    return (
      <div className="app-container">
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