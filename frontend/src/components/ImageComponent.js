// ImageComponent.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageComponent = () => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    //GOES TO SERVER.JS TO RETRIEVE FROM IMAGE ROUTE
    axios.get('/image')
      .then(response => {
        setImageUrl(response.data);
      })
      .catch(error => {
        console.error('Error fetching image:', error);
      });
  }, []);

  return (
    <div>
      {imageUrl && <img src={imageUrl} alt="MongoDB Image" />} {/* Render the image */}
    </div>
  );
};

export default ImageComponent;