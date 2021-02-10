import React from 'react';
import Photo from './Photo';
import NotFound from './NotFound';

// lists photos on the page
const PhotoList = (props) => {

  const results =  props.data;
  let photos;
  let heading;
  if (results.length > 0) {
    photos = results.map(photo => <Photo url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={photo.id} />);
    heading = <h2>Results</h2>;
  } else {
    photos = <NotFound />;
  }

  return(
    <div className="photo-container">
      {heading}
      <ul> {photos} </ul> 
    </div>
  )
}

export default PhotoList;