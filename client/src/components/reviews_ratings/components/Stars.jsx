import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ReviewHelpers from './ReviewHelpers.jsx';
import { faStar, faStarHalfStroke} from "@fortawesome/free-solid-svg-icons";
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
    //converts to quarter
    for(let i = 0; i < Math.floor(filled); i++) {
      starArr.push(1)
      // starArr.push(<FontAwesomeIcon icon={faStar} className="fa fa-star empty-star full-star" key={i}/>)
    }
    if(filled < 5) {
      //decimal for partial star
      const partialVal = filled - Math.floor(filled)
      //converts to quarter
      const partStar = partialStar(partialVal)
      starArr.push(partStar)
      // starArr.push(<FontAwesomeIcon icon={faStarHalfStroke} key={partStar} className="fa fa-star empty-star" id={"star-" + (partStar*100)}/>)
      // console.log('this is starArr', starArr.length)
      const empty = 5 - starArr.length
      // console.log('this is starArr empty', empty)
      for(let i = 0; i < empty; i++) {
        starArr.push(0)
        // starArr.push(<FontAwesomeIcon icon={faStar} key={i+1337} className="fa fa-star empty-star" />)
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
      </div>
    </div>
  )

}

export default Stars;