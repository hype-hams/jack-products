import React, {useState} from 'react';
import axios from 'axios';
import ReviewHelpers from './ReviewHelpers.jsx';

const ProductBreakdown = ({charObj}) => {
  // const allCharacteristics = {
  //   Size: { //135232
  //     1: 'A size too small',
  //     2: '1/2 a size too small',
  //     3: 'Perfect',
  //     4: '1/2 a size too big',
  //     5: 'A size too wide',
  //   },
  //   Width: { //135233
  //     1: 'Too narrow',
  //     2: 'Slightly narrow',
  //     3: 'Perfect',
  //     4: 'Slightly Wide',
  //     5: 'A size too wide',
  //   },
  //   Comfort: { //135221
  //     1: 'Uncomfortable',
  //     2: 'Slightly uncomfortable',
  //     3: 'Ok',
  //     4: 'Comfortable',
  //     5: 'Perfect'
  //   },
  //   Quality: { //135222
  //     1: 'Poor',
  //     2: 'Below average',
  //     3: 'What I expected',
  //     4: 'Pretty great',
  //     5: 'Perfect'
  //   },
  //   Length: { //135220
  //     1: 'Runs short',
  //     2: 'Runs slighty short',
  //     3: 'Perfect',
  //     4: 'Runs slightly long',
  //     5: 'Runs long'
  //   },
  //   Fit: { //135219
  //     1: 'Runs tight',
  //     2: 'Runs slightly tight',
  //     3: 'Perfect',
  //     4: 'Runs slightly long',
  //     5: 'Runs long'
  //   }
  // }
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
        <label>{charPresent}</label>
        <br></br>
        <meter value={charObj.value} max='5'></meter>
        <br></br>
        <span style={{fontSize:'0.4em'}}>{charTextLow}&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{charTextHigh}</span>
      </div>
  )
}

export default ProductBreakdown;