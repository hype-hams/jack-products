import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ReviewHelpers from './ReviewHelpers.jsx';
import { faStar, faStarHalfStroke} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Stars = ({productId, avgRate}) => {

  const calcStar = () => {
    if(typeof avgRate !== 'number'){
      let totalRate = 0;
      let totalVal = 0;
      for(const key in avgRate) {
        totalRate += Number(avgRate[key]);
        totalVal += avgRate[key]*key;
      }
      let average = (totalVal/totalRate).toFixed(1);
      return average
    } else {
      return avgRate
    }
  }
  //set quarter star value
  const partialStar = (val) => {
    if(val <= 0) {
      return 0
    }else if(val < .5) {
      return .25
    } else if(val < .75) {
      return .5
    } else {
      return .75
    }
  }
  //renders avg star bar
  const renderStarBar = () => {
    const starArr = [];
    //avg star val
    const filled = calcStar();
    //converts to quarter
    for(let i = 0; i < Math.floor(filled); i++) {
      starArr.push(1);
      // starArr.push(<FontAwesomeIcon icon={faStar} className="fa fa-star empty-star full-star" key={i}/>)
    }
    if(filled < 5) {
      //decimal for partial star
      const partialVal = filled - Math.floor(filled);
      //converts to quarter
      const partStar = partialStar(partialVal);
      starArr.push(partStar);

      const empty = 5 - starArr.length;
      for(let i = 0; i < empty; i++) {
        starArr.push(0)
      }

    }
    return starArr
  }

  const stars = renderStarBar().map((val, i) => {
    const starStyle = {
      background: `linear-gradient(90deg, gold
        ${val * 100}%, gray ${val * 100}%)`,
      WebkitTextFillColor: `transparent`,
      BackgroundClip: 'text',
      WebkitBackgroundClip: `text`,
    }
    return (<label key={i}
      data-testid="★"
      id="avg-rate"
      style={starStyle}
      >★</label>)
    })

  return (
    <div>
      <div className="avg-rating">
        <label id="avg-rate-bar"
          data-testid="StarsAvgRateBar">
          {stars}</label> &emsp;

        <big><b>{calcStar()}</b></big>
      </div>

    </div>
  )


}

export default Stars;