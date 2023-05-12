import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Stars from './Stars.jsx';

const RatingBreakdown = ({rating, recommended, ratingFilter, setRatingFilter, avgRate, productId}) => {
  const [totalReviews, setTotalReviews] = useState('')

  let recommendPercent = Number(recommended.true)/(Number(recommended.true) + Number(recommended.false)) * 100;

  //total ratings: votes*value

  //total reviews for given product
  const totalRev = () => {
  axios.get('/api/reviews', {
    params: {
    product_id: productId,
    sort: 'newest',
    count: 1000000000
    }
  })
  .then((response) => {
    console.log('total reviews', response.data.length)
    setTotalReviews(response.data.length)
  })
  .catch((error) => {
      console.log('this is error counting total reviews', error)
    })
  }
  useEffect(()=> {
    totalRev()
  }, [])

  const rateFilter = (e) => {
    let val = e.target.id
    // console.log('this is rate filter', val)
    if (ratingFilter[e.target.id] === true) {
      setRatingFilter((prevFilter) => {
        return {...prevFilter, [val]: false}})
    } else {
      setRatingFilter((prevFilter) => {
        return {...prevFilter, [val]: true}})
    }
    console.log('this is rate state', ratingFilter)
    // console.log('this is a test', test)
  }


  // Rating breakdown Bar
  const stars = rating.map((obj, ind) => {
    let counter =  0

    return (
    <section key={ind}>
      <label>
        <small id={obj.id}
          onClick={rateFilter}>
          {obj.id} stars
        </small>
      </label> &ensp;
      <meter className="rating-bar"
        value={obj.val}
        max='1000'></meter>
      {/* TODO COLOR CHANGE */}
      <small>
        <label className="star-vote">
          {obj.val}
        </label>
      </small>
    </section>
    )
});

  //Rating Click Filter
  // const starFilter = () => {}

  return (
    <section>
      <div>
        <Stars rating={rating}
          productId={productId}/>
        {/* TODO: style stars here */}
        <small>{totalReviews}&ensp;reviews</small>
      </div>
      <div>
        {totalRev()}
      </div>
      <div className="ratingBreakdown">
        {stars}
      </div>
      <div className="ratingBreakdown-recommend">
        <p>{recommendPercent.toFixed(2)}% of reviews recommend this product</p>
      </div>
    </section>
  )
}

export default RatingBreakdown;