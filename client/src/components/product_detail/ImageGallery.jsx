/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

function ImageGallery({ style }) {
  // const
  return (
    <div className="image-gallery-div">
      <div className="image-gallery-thumbnails-div">
        {style.photos.map((item) => <img src={item.thumbnail_url} className="image-gallery-thumbnail-img" key={item.url} />)}
      </div>
      <img src={style.photos[0].url ? style.photos[0].url : 'https://shenandoahcountyva.us/bos/wp-content/uploads/sites/4/2018/01/picture-not-available-clipart-12.jpg'} className="main-photo-img" />
    </div>
  );
}

export default ImageGallery;
