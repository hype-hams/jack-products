/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

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
          <div onClick={handleThumbnailClick} key={item.thumbnail_url}>
            <img src={item.thumbnail_url} className="image-gallery-thumbnail-img" name={index} alt="thumbnail" />
          </div>
        ))}
      </div>
      <img src={image.url ? image.url : 'https://shenandoahcountyva.us/bos/wp-content/uploads/sites/4/2018/01/picture-not-available-clipart-12.jpg'} className="main-photo-img" alt="mainphoto" />
    </div>
  );
}

export default ImageGallery;
