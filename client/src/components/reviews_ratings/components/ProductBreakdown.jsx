import React, {useState} from 'react';
import axios from 'axios';
import ReviewHelpers from './ReviewHelpers.jsx';
const ProductBreakdown = ({charObj}) => {

//size, length. comfort, quality, width, fit

//charObj = {id: ###, value: #.###}
  const presentCharacteristics = {
    135219: 'Fit',
    135220: 'Length',
    135221: 'Comfort',
    135222: 'Quality',
    135232: 'Size',
    135233: 'Width'
  };
  const charPresent = presentCharacteristics[charObj.id]

  let charTextLow
  let charTextHigh

  if(charPresent === 'Comfort' || charPresent === 'Quality') {
    charTextLow = 'Poor'
    charTextHigh= 'Perfect'
  } else {
    charTextLow = 'Too Small'
    charTextHigh = 'Too Big'
  }
// for each id match and display
// let charTable = productRating.map((id, val, ind) => <ProductBreakdown id={productRating.id} val={productRating.value} key={ind}/>)

  return (
      <div>
        <div className="product-name-bar">
          <small className="product-name"
            data-testid="ProductBreakdownTestChar"
          >{charPresent}</small>

           <meter className="product-bar"
            data-testid="ProductBreakdownTestMeter"
          value={charObj.value} max='5'></meter>
        </div>
        <div className="product-word">
          <label>{charTextLow}</label>
          <label>{charTextHigh}</label>
        </div>
      </div>
  )
}

export default ProductBreakdown;