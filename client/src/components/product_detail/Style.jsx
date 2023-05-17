/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import checkmark from './images/checkmark.png';
import imageNotAvailable from './images/imageNotAvailable.png';

function Style({ style, selectedStyleId, handleClick }) {
  const thumbnailOnClick = (e) => {
    handleClick(style.style_id);
  };

  return (
    <div className="style-each-thumbnail-div" data-testid="style-thumbnail" onClick={thumbnailOnClick}>
      {(style.style_id === selectedStyleId) && <img src={checkmark} className="checkmark" alt="checkmark" />}
      <img src={style.photos[0].thumbnail_url || imageNotAvailable} className="style-each-thumbnail-img" alt="thumbnail of style" />
    </div>
  );
}

export default Style;
