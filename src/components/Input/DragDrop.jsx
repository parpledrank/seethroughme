import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Request from 'superagent';
import { browserHistory } from 'react-router';
import axios from 'axios';


class DragDrop extends Component{

  constructor(props){
    super(props);
    this.state = {
      imgURL: '',
      file: ''
    }
    this.onDrop = this.onDrop.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onDrop(acceptedFiles) {
    let file = new FormData();
    file.append('', acceptedFiles[0]);
    this.setState({
      file: file
    });
  }

  onButtonClick() {
    console.log(this.state.file);
    let buttonClasses = document.getElementById("button-classes").classList;
    if (!buttonClasses.contains("topAnimation")) {
      buttonClasses.add("topAnimation")
      setTimeout(() => {
        buttonClasses.remove("topAnimation");
      }, 1000);
    }


    Request.post('/api/img')
    .send(this.state.file)
    .end((err, res)=>{
      let result = JSON.parse(res.text)

      this.props.changeParentUrl(result.data.link)
      this.setState({imgURL: result.data.link});
    });
  }

  render(){
    
    // let source = (this.state.imgURL.length) ? 'localhost:8080/' + this.state.imgURL : 'none';

    return (
      <div className="drop-zone">

        <Dropzone className="drop-zone-field" onDrop={this.onDrop}>
          <div className="drop-zone-text">upload image</div>
        </Dropzone>

        <div id="button" onClick={this.onButtonClick}>
          <div id="button-classes" className="top">
            <span>translate</span>
          </div>
          <div className="shadow"></div>
        </div>
      </div>
    )
  }

}

export default DragDrop;