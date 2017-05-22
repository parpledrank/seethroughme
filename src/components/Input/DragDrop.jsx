import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { browserHistory } from 'react-router';
import axios from 'axios';


class DragDrop extends Component{

  constructor(props){
    super(props);
    this.state = {
      filePreview: ''
    }
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(acceptedFiles) {
    console.log(acceptedFiles);
    this.setState({
      filePreview: acceptedFiles[0]
    })
    let file = new FormData();
    file.append('', acceptedFiles[0]);
    this.props.captureUploadedFile(file);
  }

  render(){
    return (
      <div className="drop-zone">
        <Dropzone className="drop-zone-field" onDrop={this.onDrop}>
          <div className="drop-zone-text">image upload</div>
        </Dropzone>
        <div>{<img src={this.state.filePreview.preview} />}</div>
      </div>
    )
  }
}

export default DragDrop;