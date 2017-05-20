import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Request from 'superagent';
import { browserHistory } from 'react-router';
import axios from 'axios';


class DragDrop extends Component{

  constructor(props){
    super(props);
    this.state = {
      imgURL: ''
    }
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(acceptedFiles){
    let file = new FormData();
    file.append('', acceptedFiles[0]);
    console.log('hey');
    Request.post('/api/img')
      .send(file)
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
          <div className="drop-zone-text">drag a picture here (click me)</div>
        </Dropzone>
      </div>
    )
  }

}

export default DragDrop;