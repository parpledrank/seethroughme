import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Request from 'superagent';
import { browserHistory } from 'react-router';
import axios from 'axios';


class DragDrop extends Component{

  constructor(props){
    super(props);
    this.state = {
    }
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(acceptedFiles) {
    let file = new FormData();
    file.append('', acceptedFiles[0]);
    this.props.captureUploadedFile(file);
  }

  render(){
    return (
      <div className="drop-zone">
        <Dropzone className="drop-zone-field" onDrop={this.onDrop}>
          <div className="drop-zone-text">upload image</div>
        </Dropzone>
      </div>
    )
  }
}

export default DragDrop;