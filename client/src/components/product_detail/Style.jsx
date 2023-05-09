/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

function Style({ style, handleClick }) {
  const thumbnailOnClick = (e) => {
    handleClick(style.style_id);
  };
  return (
    <div onClick={thumbnailOnClick}>
      <img src={style.photos[0].thumbnail_url ? style.photos[0].thumbnail_url : 'https://shenandoahcountyva.us/bos/wp-content/uploads/sites/4/2018/01/picture-not-available-clipart-12.jpg'} alt="thumbnail of style" className="style-thumbnails" />
    </div>
  );
}

export default Style;
