import React, { Component } from 'react';
import DragDrop from './DragDrop.jsx';
import { browerHistory } from 'react-router';
import Request from 'superagent';

class Input extends Component {
  constructor(props){
    super(props)
    this.state = {
      url: '',
      file: ''
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleUrlUpdate = this.handleUrlUpdate.bind(this);
    this.captureUploadedFile = this.captureUploadedFile.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  captureUploadedFile(file) {
    this.setState({
      file: file
    }, () => {
      console.log(this.state.file);
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
      this.props.changeParentUrl(this.state.url);
      this.setState({
        url: ''
      });
    } else if (this.state.file) {
      Request.post('/api/img')
      .send(this.state.file)
      .end((err, res)=>{
        let result = JSON.parse(res.text)
        this.props.changeParentUrl(result.data.link);
      });
    } else {
      alert('Please provide some form of input.');
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
    this.props.changeParentUrl(this.state.url);
    this.setState({
      url: ''
    });
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
