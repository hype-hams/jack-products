import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ReviewHelpers from './ReviewHelpers.jsx';


const Stars = ({product}) => {
  const [avgRate, setAvgRate] = useState('')

  const getStars = () => {
    axios.get(`/api/reviews/meta?product_id=${product}`)
      .then(response => {
        console.log('this is stars data', response.data.ratings)
        setAvgRate(response.data.ratings)
      })
  }
  useEffect(() => {
    getStars()
  }, [])

  let totalRate = 0;
  let totalVal = 0;
  for(const key in avgRate) {
    totalRate += Number(avgRate[key]);
    totalVal += avgRate[key]*key;
  }
  let avg = (totalVal/totalRate).toFixed(2);

  return (
    <div>
      <p><big><b>{avg}</b></big></p>
    </div>
  )




}

export default Stars;