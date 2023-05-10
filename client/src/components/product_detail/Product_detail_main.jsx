/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import AddToCart from './AddToCart.jsx';
import ImageGallery from './ImageGallery.jsx';
import Style from './Style.jsx';

const axios = require('axios');

function ProductDetail({ product, styles }) {
  // styles.results is an array storing all styles, set the first style object in array as default style
  const [style, setStyle] = useState(styles.results[0]);

  // change style when user click on thumbnail
  const handleThumbnailOnClick = (styleId) => {
    const newStyle = styles.results.filter((item) => item.style_id === styleId);
    setStyle(newStyle[0]); // filter return an array
  };

  const skusArray = Object.entries(style.skus)
    .map((item) => ({ sku_id: item[0], quantity: item[1].quantity, size: item[1].size }));

  return (
    <div className="product-detail-section">
      <div className="product-detail-div">
        <ImageGallery style={style} />
        <div className="product-detail-div__right">
          <small>Read all reviews</small>
          <h3>{product.category}</h3>
          <h1>{product.name}</h1>
          <small>
            {style.sale_price ? (
              <p>
                <s>{`$${style.original_price}`}</s>
                <span style={{ color: 'red' }}>{` $${style.sale_price}`}</span>
              </p>
            ) : `$${style.original_price}`}
          </small>
          <p>
            <b>STYLE &gt; </b>
            {style.name}
          </p>
          <div className="style-thumbnails-div">
            {styles.results.map((item) => (<Style style={item} selectedStyleId={style.style_id} handleClick={handleThumbnailOnClick} key={item.style_id} />))}
          </div>
          <AddToCart skus={skusArray} />
        </div>
      </div>
      <div className="product-description"><p>{product.description}</p></div>
      <div className="share-on-social-media">
        <a className="fb-share-button" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse" rel="noreferrer">
          <img src="https://mississippiriverdelta.org/files/2021/04/download-icon-share-facebook-svg-eps-png-psd-ai-vector-el-fonts-facebook-share-png-1600_522.png" alt="facebook-share" width="10%" />
        </a>
        <a className="twitter-share-button" target="_blank" rel="noreferrer" href="https://twitter.com/intent/tweet">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHeBJpTHmu42JlXBIpJaQpzO86vaBNBevrFq4ZsvgGO15cDMP29qRmyBJ9pipIMaYZtg&usqp=CAU" alt="twitter-share" width="10%" />
        </a>
        <a className="pinterest-share-button" target="_blank" rel="noreferrer" href="https://www.pinterest.com/pin/create/button/">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1Ev4FtVSjkHTnLVaXCmGMDWK2AvY4MTMbXv-YPvEEE0VIuh64erHSx15eeHWC3jVc9g&usqp=CAU" alt="pinterest-share" width="10%" />
        </a>
      </div>
    </div>
  );
}

export default ProductDetail;
