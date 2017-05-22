import React, { Component } from 'react';

const ImageView = (props) => {
  return (
    <div className="image-view-container">
      <img src={props.imgURL} className="image-view" />
    </div>
  )
}

export default ImageView;
