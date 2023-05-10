/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

const checkmark = require('./images/checkmark.png');

function Style({ style, selectedStyleId, handleClick }) {
  const thumbnailOnClick = (e) => {
    handleClick(style.style_id);
  };

  return (
    <div className="style-each-thumbnail-div" onClick={thumbnailOnClick}>
      {(style.style_id === selectedStyleId) && <img src={checkmark} width="20%" className="checkmark" alt="checkmark" />}
      <img src={style.photos[0].thumbnail_url ? style.photos[0].thumbnail_url : 'https://shenandoahcountyva.us/bos/wp-content/uploads/sites/4/2018/01/picture-not-available-clipart-12.jpg'} alt="thumbnail of style" className="style-each-thumbnail-img" />
    </div>
  );
}

export default Style;
