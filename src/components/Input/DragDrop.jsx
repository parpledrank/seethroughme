import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Axios from 'axios';


class DragDrop extends Component{

  constructor(props){
    super(props);
    this.state = {
      url: ''
    }
  }

  handleChangeImgURL(url) {
    this.props.handleChangeImgURL(url);
  }

  onDrop(acceptedFiles){
    console.log(acceptedFiles);
    axios.post('/upload', acceptedFiles)
    .then(function(response){
      //try to respond with an image URL
      console.log(response);
      this.handleChangeImgURL(response);
    })
    .catch(function(error){
      console.log(error);
    })
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