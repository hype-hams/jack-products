/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';
import checkmark from './images/checkmark.png';
import imageNotAvailable from './images/imageNotAvailable.png';

function Style({ style, selectedStyleId, handleClick }) {
  const thumbnailOnClick = () => {
    handleClick(style.style_id);
  };

  const imageStyle = { filter: (style.style_id === selectedStyleId) ? 'none' : 'brightness(70%)' };

  return (
    <div className="style-each-thumbnail-div" data-testid="style-thumbnail" onClick={thumbnailOnClick}>
      {(style.style_id === selectedStyleId) && <img src={checkmark} loading="lazy" className="checkmark" alt="checkmark" />}
      <img
        src={style.photos[0].thumbnail_url || imageNotAvailable}
        style={imageStyle}
        className="style-each-thumbnail-img"
        alt="thumbnail of style"
      />
    </div>
  );
}

export default Style;
