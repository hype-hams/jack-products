/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import imageNotAvailable from './images/imageNotAvailable.png';

function ImageGallery({ photos }) {
  const [image, setImage] = useState(photos[0]);

  const handleThumbnailClick = (e) => {
    e.preventDefault();
    const index = e.target.name;
    setImage(photos[index]);
  };

  useEffect(() => {
    setImage(photos[0]); // Update the currently displayed image when the photos prop changes
  }, [photos]);

  return (
    <div className="image-gallery-div">
      <div className="image-gallery-thumbnails-div">
        {photos.map((item, index) => (
          <div style={item.url === image.url ? { borderBottom: 'thick solid white' } : { borderBottom: 'none' }} onClick={handleThumbnailClick} key={item.url}>
            <img src={item.thumbnail_url || imageNotAvailable} name={index} className="image-gallery-thumbnail-img" alt="thumbnail" />
          </div>
        ))}
      </div>
      <img src={image.url || imageNotAvailable} className="main-photo-img" alt="mainphoto" />
    </div>
  );
}

export default ImageGallery;

/*

    border-bottom-width: thick;
    border-bottom-style: solid;
    border-bottom-color: white;
*/
