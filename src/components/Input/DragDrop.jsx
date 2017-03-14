import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import { browserHistory } from 'react-router';


class DragDrop extends Component{

  constructor(props){
    super(props);

    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(acceptedFiles){
    this.props.changeParentUrl(acceptedFiles[0].preview);
  }

  render(){
    return (
      <div className="drop-zone">
        <Dropzone onDrop={this.onDrop}>
          <div className="drop-zone-text">Drop some files into here</div>
        </Dropzone>
      </div>
    )
  }

}

export default DragDrop;