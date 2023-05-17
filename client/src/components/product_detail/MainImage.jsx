/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import imageNotAvailable from './images/imageNotAvailable.png';

function MainImage({ image, setExpandedView }) {
  const [icon, setIcon] = useState(<FontAwesomeIcon icon={faExpand} size="xl" style={{ color: '#e8e8e8' }} />);
  const [expanded, setExpanded] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [imgPos, setImgPos] = useState({ x: 0, y: 0 });
  const [pan, setPan] = useState(false);

  const handleMouseMove = (e) => {
    setImgPos({ x: e.clientX, y: e.clientY });
  };

  const changeToExpandedView = () => {
    setZoom(false);
    setIcon(<FontAwesomeIcon icon={faCircleXmark} size="2xl" style={{ color: '#474747' }} />);
    setExpandedView({ position: 'absolute', zIndex: '900' });
    document.querySelector('.main-image-img').style['object-fit'] = 'contain';
  };

  const changeToDefaultView = () => {
    setZoom(false);
    setIcon(<FontAwesomeIcon icon={faExpand} size="2xl" style={{ color: '#e8e8e8' }} />);
    setExpandedView({ position: 'relative', zIndex: '0' });
    document.querySelector('.main-image-img').style.cursor = null; // clear the zoom-in/out cursor
    document.querySelector('.main-image-img').style['object-fit'] = 'cover';
  };

  const handleIconClick = () => {
    if (expanded) {
      changeToDefaultView();
    } else {
      changeToExpandedView();
    }
    setExpanded(!expanded);
  };

  const handleMainImageClick = (e) => {
    setExpanded(true);
    changeToExpandedView();
    if (!zoom) {
      e.target.style.cursor = 'zoom-in';
      document.querySelector('.main-image-img').style.transform = null;
      document.querySelector('.main-image-img').style['transform-origin'] = null;
      setPan(false);
    } else {
      e.target.style.cursor = 'zoom-out';
      setPan(true);
    }
    setZoom(!zoom);
  };

  const zoomedStyle = pan ? { transformOrigin: `${imgPos.x}px ${imgPos.y}px`, transform: 'scale(2.5)' } : { transform: 'none' };

  return (
    <div className="main-image-div" onMouseMove={handleMouseMove}>
      <div className="expanded-view-icon" data-testid="icon" onClick={handleIconClick}>{icon}</div>
      <img src={image.url || imageNotAvailable} style={zoomedStyle} onClick={handleMainImageClick} className="main-image-img" alt="main" />
    </div>
  );
}

export default MainImage;
