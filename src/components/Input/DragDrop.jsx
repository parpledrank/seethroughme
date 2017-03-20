import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Request from 'superagent';
import { browserHistory } from 'react-router';


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
    file.append('westinFile', acceptedFiles[0]);
    Request.post('/api/img')
      .send(file)
      .end((err, res)=>{
      //we'll update this once we figure out hosting
      // this.props.changeParentUrl('http://localhost:8080' + res.text);
        this.setState({imgURL: res.text});
      });
  }

  render(){
    
    let source = (this.state.imgURL.length) ? 'localhost:8080/' + this.state.imgURL : 'none';

    return (
      <div className="drop-zone">
        
        <img src={this.state.imgURL} />
        <br />
        {'img source: ' + source}
        <br />

        <Dropzone className="drop-zone-field" onDrop={this.onDrop}>
          <div className="drop-zone-text">drag a picture here (click me)</div>
        </Dropzone>
      </div>
    )
  }

}

export default DragDrop;