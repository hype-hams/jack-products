import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ReviewHelpers from './ReviewHelpers.jsx';
import { faStar } from "@fortawesome/free-solid-svg-icons";
import {faStarHalfStroke} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Stars = ({productId, rating}) => {
  const [avgRate, setAvgRate] = useState('')
  // const [avg, setAvg] = useState(calcStar)
  //Grabs star information from server
  const getStars = () => {
      const metaData = axios.get(`/api/reviews/meta?product_id=${productId}`)
      .then(response => {
        // console.log('this is stars data', response.data.ratings)
        setAvgRate(response.data.ratings)
      })
  }
  //calculates avg star rating
  const calcStar = () => {
    let totalRate = 0;
    let totalVal = 0;
    for(const key in avgRate) {
      totalRate += Number(avgRate[key]);
      totalVal += avgRate[key]*key;
    }
    let average = (totalVal/totalRate).toFixed(1);
    return average
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
    const filled = calcStar()
    const partialVal = filled - Math.floor(filled)
    const partStar = partialStar(partialVal)
    const empty = 5 - Math.ceil(filled)

    console.log('this is partial' , partialVal)
    console.log('this is part Star', partStar)
    const result = []
    for(let i = 0; i < Math.floor(filled); i++) {
      starArr.push(1)
      // starArr.push(<FontAwesomeIcon icon={faStar} className="fa fa-star empty-star full-star" key={i}/>)
    }
    if(partStar > 0) {
      //  result.push(<FontAwesomeIcon icon={faStar} key={partStar} className="fa fa-star empty-star" id={"star-" + (partStar*100).toString()}/>)
      result.push(<FontAwesomeIcon icon={faStarHalfStroke} className="fa fa-star full-star"/>);
    }
    if(empty > 0) {
      for(let i = 0; i < empty; i++) {
        result.push(<FontAwesomeIcon icon={faStar} key={i+1337} className="fa fa-star empty-star" />)
      }
      // console.log('this is starArr', starArr)

    }
    // return starArr
    // console.log('this is starArr', starArr.length)
    const stars = starArr.map((val, i) => {
      const starStyle = {
        border:`solid 1px black`,
        borderRadius:'5px',
        background: `linear-gradient(90deg, gold
          ${val * 100}%, white ${val * 100}%)`,
          WebkitBackgroundFill: 'text',
          WebkitTextFillColor: 'grey',
      }
      return <label key={i}
        id="avg-rate"
        style={starStyle}
        >★</label>
      })
      return stars

  }


  useEffect(() => {
    getStars()
    // calcStar()
  }, [])

  return (
    <div>
      <div className="avg-rating">
        <label id="avg-rate-bar"
>{renderStarBar()}</label> &emsp;
        <big><b>{calcStar()}</b></big>
      </p>
      <div className="avg-rating">
        <label>{renderStarBar()}</label>
      </div>
    </div>
  )

}

export default Stars;