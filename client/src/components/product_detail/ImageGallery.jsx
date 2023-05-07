/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

function ImageGallery({ style }) {
  return (
    <div className="image-gallery-div">
      <img src={style.photos[0].url} id="main-photo" />
    </div>
  );
}

export default ImageGallery;
