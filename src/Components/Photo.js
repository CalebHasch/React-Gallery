import React from 'react';

// returns a photo
const Photo = props => (
  <li>
    <img src={props.url} alt="" />
  </li>
);

export default Photo;