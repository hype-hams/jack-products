/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';

function ImageGallery({ style }) {
  return (
    <div className="image-gallery-div">
      <img src={style.photos[0].url ? style.photos[0].url : 'https://shenandoahcountyva.us/bos/wp-content/uploads/sites/4/2018/01/picture-not-available-clipart-12.jpg'} id="main-photo" />
    </div>
  );
}

export default ImageGallery;
