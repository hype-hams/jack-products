/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import imageNotAvailable from './images/imageNotAvailable.png';
import leftArrow from './images/leftArrow.png';
import rightArrow from './images/rightArrow.png';
// import upArrow from './images/upArrow.png';
// import downArrow from './images/downArrow.png';

function ImageGallery({ photos }) {
  const [image, setImage] = useState(photos[0]);
  const [photoIndex, setPhotoIndex] = useState(0);

  const handleThumbnailClick = (e) => {
    e.preventDefault();
    const index = Number(e.target.name); // fixed the bug: typeof e.target.name is string
    setImage(photos[index]);
    setPhotoIndex(index);
  };

  const handleLeftArrowClick = (e) => {
    e.preventDefault();
    if (photoIndex > 0 && photoIndex <= photos.length - 1) { // fixed some bugs here
      const index = photoIndex - 1;
      setImage(photos[index]);
      setPhotoIndex(index);
    }
  };

  const handleRightArrowClick = (e) => {
    e.preventDefault();
    if (photoIndex >= 0 && photoIndex < photos.length - 1) { // fixed some bugs here
      const index = photoIndex + 1;
      setImage(photos[index]);
      setPhotoIndex(index);
    }
  };

  useEffect(() => {
    setImage(photos[0]); // Update the currently displayed image when the photos prop changes
    setPhotoIndex(0); // after switching to a new style, need to reset index to 0
  }, [photos]);

  return (
    <div className="image-gallery-div">
      <div className="image-gallery-thumbnails-div">
        {photos.map((item, index) => (
          <div style={(item.url === image.url) ? { borderBottom: 'thick solid white' } : { borderBottom: 'none' }} onClick={handleThumbnailClick} key={item.url}>
            <img src={item.thumbnail_url || imageNotAvailable} name={index} className="image-gallery-thumbnail-img" alt="thumbnail" />
          </div>
        ))}
      </div>
      <div
        className="left-arrow-div"
        style={!photoIndex ? { display: 'none' } : { display: 'block' }}
        onClick={handleLeftArrowClick}
      >
        <img src={leftArrow} width="100%" alt="leftArrow" />
      </div>
      <div
        className="right-arrow-div"
        style={(photoIndex === photos.length - 1) ? { display: 'none' } : { display: 'block' }}
        onClick={handleRightArrowClick}
      >
        <img src={rightArrow} width="100%" alt="rightArrow" />
      </div>
      <img src={image.url || imageNotAvailable} className="main-photo-img" alt="mainphoto" />
    </div>
  );
}

export default ImageGallery;
