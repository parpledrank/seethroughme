import React from 'react';

// ImageView Component only contains imageURL
// Using Stateless style
// Expect App.js pass imageURL data to ImageView
function ImageView(props) {
  return (
    <div className="ImageBox">
      <img src={props.imageURL} className="ImageView" />
    </div>
  )
}

export default ImageView;
