import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ReviewHelpers from './ReviewHelpers.jsx';
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Stars = ({productId, rating}) => {
  const [avgRate, setAvgRate] = useState('')
  const [avg, setAvg] = useState('')
  //Grabs star information from server
  const getStars = () => {
    axios.get(`/api/reviews/meta?product_id=${productId}`)
      .then(response => {
        console.log('this is stars data', response.data.ratings)
        setAvgRate(response.data.ratings)
      })
  }

  const calcStar = () => {
    let totalRate = 0;
    let totalVal = 0;
    for(const key in avgRate) {
      totalRate += Number(avgRate[key]);
      totalVal += avgRate[key]*key;
    }
    let average = (totalVal/totalRate).toFixed(1);
    if(avg === '') {
      setAvg(average)
    }
    return average
  }

  const renderStar = () => {
    const filled = Math.floor(calcStar())
    // console.log('this is filled stars', filled)
    const result = []
    for(let i = 0; i < filled; i ++) {
      // result.push(<span key={i} className= "fa fa-star empty-star full-star"></span>)
      result.push(<FontAwesomeIcon icon={faStar} key={i}/>)

    }
    // result.push(<FontAwesomeIcon icon="fa-solid fa-star" />)
    return result
  }

  useEffect(() => {
    getStars()
    calcStar()
  }, [])

  // let totalRate = 0;
  // let totalVal = 0;
  // for(const key in avgRate) {
  //   totalRate += Number(avgRate[key]);
  //   totalVal += avgRate[key]*key;
  // }
  // let avg = (totalVal/totalRate).toFixed(1);

  return (
    <div>
      <p id="avgStars">
        <big><b>{calcStar()}</b></big>
      </p>
      <div className="avg-rating">
        <label>{renderStar()}</label>

      </div>

    </div>
  )




}

export default Stars;