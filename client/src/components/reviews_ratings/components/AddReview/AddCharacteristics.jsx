import React, {useState, useEffect} from 'react';
import axios from 'axios';


const AddCharacteristics = ({charObj, characteristics, setCharacteristics}) => {
  //Checks characteristics on product
  const presentCharacteristics = {
    135219: 'Fit',
    135220: 'Length',
    135221: 'Comfort',
    135222: 'Quality',
    135232: 'Size',
    135233: 'Width'
  };
  //alias
  const charOption = presentCharacteristics[charObj.id];
  //sets each button based on alias
  let char1;
  let char2;
  let char3;
  let char4;
  let char5;
  if (charOption === 'Fit') {
    char1 = 'Runs tight'
    char2 = 'Runs slightly tight'
    char3 = 'Perfect'
    char4 = 'Runs slightly long'
    char5 = 'Runs long'
  }
  if (charOption === 'Size') {
    char1 = 'A size too small'
    char2 = '1/2 a size too small'
    char3 = 'Perfect'
    char4 = '1/2 a size too big'
    char5 = 'A size too wide'
  }
  if (charOption === 'Width') {
    char1 = 'Too narrow'
    char2 = 'Slightly narrow'
    char3 = 'Perfect'
    char4 = 'Slightly Wide'
    char5 = 'A size too wide'
  }
  if (charOption === 'Comfort') {
    char1 = 'Uncomfortable'
    char2 = 'Slightly uncomfortable'
    char3 = 'Ok'
    char4 = 'Comfortable'
    char5 = 'Perfect'
  }
  if (charOption === 'Quality') {
    char1 = 'Poor'
    char2 = 'Below average'
    char3 = 'What I expected'
    char4 = 'Pretty great'
    char5 = 'Perfect'
  }
  if (charOption === 'Length') {
    char1 = 'Runs short',
    char2 = 'Runs slightly short',
    char3 = 'Perfect',
    char4 = 'Runs slightly long',
    char5 = 'Runs long'
  }
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
    const clickHandle = (e) => {
      setCharacteristics({...characteristics, [e.target.name]: e.target.value})
    }
  // const setCharObj = (charID, value) => {
  //   setCharacteristics({...characteristics, [charID]: Number(value)})
  // }

  return (
    <section className="add-char">
      <label className="add-review-char-name"
        >{charOption}:
      </label>
      <section className="add-review-char-button">
        <label className="add-char-input">
          <input name={charObj.id}
            type="radio"
            value="1"
            data-testid="char1"
            onClick={clickHandle}/>
          <small className="review-char-text">{char1}</small>
        </label>
        <label className="add-char-input">
          <input name={charObj.id}
            type="radio"
            value="2"
            data-testid="char2"
            onClick={clickHandle}/>
          <small className="review-char-text">{char2}</small>
        </label>
        <label className="add-char-input">
          <input name={charObj.id}
            type="radio"
            value="3"
            data-testid="char3"
            onClick={clickHandle}
            />
          <small className="review-char-text">{char3}</small>
        </label>
        <label className="add-char-input">
          <input name={charObj.id}
            type="radio"
            value="4"
            data-testid="char4"
            onClick={clickHandle}
            />
          <small className="review-char-text">{char4}</small>
        </label>
        <label className="add-char-input">
          <input name={charObj.id}
            type="radio"
            value="5"
            data-testid="char5"
            // onClick={(e)=> setCharObj(charObj.id, e.target.value)}
            onClick={clickHandle}/>
          <small className="review-char-text">{char5}</small>
        </label>
      </section>

    </section>
  )

};

export default AddCharacteristics;