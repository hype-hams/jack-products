/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faPinterest } from '@fortawesome/free-brands-svg-icons';
import AddToCart from './AddToCart.jsx';
import ImageGallery from './ImageGallery.jsx';
import Style from './Style.jsx';
import Stars from '../reviews_ratings/components/Stars.jsx';

function ProductDetail({ product, styles }) {
  // styles.results is an array storing all styles, set the first style object as default style
  const [style, setStyle] = useState(styles.results[0]);

  // change style when user click on thumbnail
  const handleThumbnailOnClick = (styleId) => {
    const newStyle = styles.results.filter((item) => item.style_id === styleId);
    setStyle(newStyle[0]); // filter return an array
  };

  const handleReadAllReviewClick = () => {
    document.querySelector('.rating-review')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const skusArray = Object.entries(style.skus)
    .map((item) => ({ sku_id: item[0], quantity: item[1].quantity, size: item[1].size }));

  return (
    <div className="product-detail-section">
      <div className="product-detail-div">
        <ImageGallery photos={style.photos} />
        <div className="product-detail-div__right">
          <div className="star"><Stars productId={product.id} /></div>
          <small onClick={handleReadAllReviewClick}>Read all reviews</small>
          <h2>{product.category}</h2>
          <h1>{product.name}</h1>
          <span>
            {style.sale_price ? (
              <p>
                <s>{`$${style.original_price}`}</s>
                <span style={{ color: 'red' }}>{` $${style.sale_price}`}</span>
              </p>
            ) : `$${style.original_price}`}
          </span>
          <p>
            <b>STYLE &gt; </b>
            {style.name}
          </p>
          <div className="style-thumbnails-div">
            {styles.results.map((item) => (
              <Style
                style={item}
                selectedStyleId={style.style_id}
                handleClick={handleThumbnailOnClick}
                key={item.style_id}
              />
            ))}
          </div>
          <AddToCart skus={skusArray} />
        </div>
      </div>
      <div className="product-description"><p>{product.description}</p></div>
      <div className="share-on-social-media">
        <a className="fb-share-button" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse" rel="noreferrer">
          <FontAwesomeIcon icon={faFacebook} size="2xl" style={{ color: '#4267b2' }} />
        </a>
        <a className="twitter-share-button" target="_blank" rel="noreferrer" href="https://twitter.com/intent/tweet">
          <FontAwesomeIcon icon={faTwitter} size="2xl" style={{ color: '#1da1f2' }} />
        </a>
        <a className="pinterest-share-button" target="_blank" rel="noreferrer" href="https://www.pinterest.com/pin/create/button/">
          <FontAwesomeIcon icon={faPinterest} size="2xl" style={{ color: '#e60023' }} />
        </a>
      </div>
    </div>
  );
}

export default ProductDetail;
