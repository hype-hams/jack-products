/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import MainImage from './MainImage.jsx';
import imageNotAvailable from './images/imageNotAvailable.png';
import leftArrow from './images/leftArrow.png';
import rightArrow from './images/rightArrow.png';
import upArrow from './images/upArrow.png';
import downArrow from './images/downArrow.png';

function ImageGallery({ photos }) {
  const [image, setImage] = useState(photos[0]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [expandedView, setExpandedView] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    setImage(photos[0]); // Update the currently displayed image when the photos prop changes
    setPhotoIndex(0); // after switching to a new style, need to reset index to 0
    scrollRef.current = document.querySelector('.first-thumbnail');
    scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [photos]);

  const handleThumbnailClick = (e) => {
    if (e.target.name) { // click on other element, e.target.name is undefined will cause bug
      const index = Number(e.target.name); // typeof e.target.name is string
      if (typeof index === 'number') {
        setImage(photos[index]);
        setPhotoIndex(index);
        scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  const handleLeftArrowClick = () => {
    if (photoIndex > 0 && photoIndex <= photos.length - 1) { // fixed some bugs here
      const index = photoIndex - 1;
      setImage(photos[index]);
      setPhotoIndex(index);
      scrollRef.current = document.querySelector('.selected-thumbnail');
      scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  const handleRightArrowClick = () => {
    if (photoIndex >= 0 && photoIndex < photos.length - 1) { // fixed some bugs here
      const index = photoIndex + 1;
      setImage(photos[index]);
      setPhotoIndex(index);
      scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  const handleUpArrowClick = () => {
    scrollRef.current = document.querySelector('.first-thumbnail');
    scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const handleDownArrowClick = () => {
    scrollRef.current = document.querySelector('.last-thumbnail');
    scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  return (
    <div className="image-gallery-div" style={expandedView}>
      <div className="image-gallery-thumbnails-div">
        {photos.map((item, index) => (
          // using photoIndex + 1 so that when handling right arrow click ref is the current one
          <div
            ref={(index === photoIndex + 1) ? scrollRef : null}
            style={{ borderBottom: (index === photoIndex) ? 'thick solid white' : 'none' }}
            className={(index === 0) ? 'first-thumbnail' : ((index === photoIndex) ? 'selected-thumbnail' : ((index === photos.length - 1) ? 'last-thumbnail' : 'image-gallery-thumbnail-div'))}
            onClick={handleThumbnailClick}
            key={index}
          >
            <img src={item.thumbnail_url || imageNotAvailable} name={index} className="image-gallery-thumbnail-img" alt="thumbnail" />
          </div>
        ))}
      </div>
      <div className="up-arrow-div" onClick={handleUpArrowClick}>
        <img src={upArrow} width="100%" alt="leftArrow" />
      </div>
      <div className="down-arrow-div" onClick={handleDownArrowClick}>
        <img src={downArrow} width="100%" alt="rightArrow" />
      </div>
      <div
        className="left-arrow-div"
        style={{ display: photoIndex ? 'block' : 'none' }}
        onClick={handleLeftArrowClick}
      >
        <img src={leftArrow} width="100%" alt="leftArrow" />
      </div>
      <div
        className="right-arrow-div"
        style={{ display: (photoIndex === photos.length - 1) ? 'none' : 'block' }}
        onClick={handleRightArrowClick}
      >
        <img src={rightArrow} width="100%" alt="rightArrow" />
      </div>
      <MainImage image={image} setExpandedView={setExpandedView} />
    </div>
  );
}

export default ImageGallery;
