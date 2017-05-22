import React, { Component } from 'react';
import DragDrop from './DragDrop.jsx';
import { browerHistory } from 'react-router';
import Request from 'superagent';

class Input extends Component {
  constructor(props){
    super(props)
    this.state = {
      url: '',
      file: '',
      invalidFile: false,
      processing: false
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleUrlUpdate = this.handleUrlUpdate.bind(this);
    this.captureUploadedFile = this.captureUploadedFile.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.validateImageURL = this.validateImageURL.bind(this);
  }

  validateImageURL(url) {
    return (url.match(/\.(jpeg|jpg|png)$/) != null);
  }

  captureUploadedFile(file) {
    this.setState({
      file: file
    });
  }
  
  onButtonClick() {
    let buttonClasses = document.getElementById("button-classes").classList;

    if (!buttonClasses.contains("topAnimation")) {
      buttonClasses.add("topAnimation")
      setTimeout(() => {
        buttonClasses.remove("topAnimation");
      }, 1000);
    }

    if (this.state.url) {
      if (this.validateImageURL(this.state.url)) {
        this.setState({
          invalidFile: false,
          processing: true
        });
        
        this.props.changeParentUrl(this.state.url);
      } else {
        this.setState({
          invalidFile: true
        })
      }

      this.setState({
        url: ''
      });
    } else if (this.state.file) {
      this.setState({
        invalidFile: false,
        processing: true
      });

      Request.post('/api/img')
      .send(this.state.file)
      .end((err, res)=>{
        let result = JSON.parse(res.text)
        this.props.changeParentUrl(result.data.link);
      });
    } else {
      this.setState({
        invalidFile: true
      });
    }
  }

  componentDidMount() {
    document.getElementsByClassName("input")[0].focus();
  }

  handleUrlUpdate(event){
    this.setState({
      url: event.target.value
    });
  }

  handleClick(event){
    event.preventDefault();
    if (this.state.url) {
      if (this.validateImageURL(this.state.url)) {
        this.setState({
          invalidFile: false,
          processing: true
        });

        this.props.changeParentUrl(this.state.url);
      } else {
        this.setState({
          invalidFile: true
        });
      }

      this.setState({
        url: ''
      });
    }
  }

  render() {
    return (
      <div className="input-page">
        <div className="input-container">
          <div className="url-input">
            <div className="input-header">see through me</div>
            <div className="url-input-field">
              <form onSubmit={this.handleClick}>
                <input className="input"
                  type="text"
                  value={this.state.url}
                  onChange={this.handleUrlUpdate}
                  placeholder="image url"
                />
              </form>
            </div>
          </div>

          <DragDrop 
            className="dragdrop-input" 
            changeParentUrl={this.props.changeParentUrl} 
            captureUploadedFile={this.captureUploadedFile}/>
        </div>

        {this.state.invalidFile ? <div className="error-message">Please provide valid image url (png or jpg) or image upload.</div> : null}
        {this.state.processing ? <div className="success-message">Processing image ...</div> : null}
        
        <div id="button" onClick={this.onButtonClick}>
          <div id="button-classes" className="top">
            <span>translate</span>
          </div>
          <div className="shadow"></div>
        </div>
      </div>
    );
  }
}

export default Input;
