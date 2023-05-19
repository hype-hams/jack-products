import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Stars from './Stars.jsx';

const RatingBreakdown = ({rating, recommended, total, ratingFilter, setRatingFilter, productId, avgRate}) => {

  let recommendPercent = Number(recommended.true)/(Number(recommended.true) + Number(recommended.false)) * 100;

  const barTotal = () => {
    let rateBarTotal = 0
    for(const key in avgRate) {
      rateBarTotal += Number(avgRate[key])
    }
    return rateBarTotal
  }

  const rateFilter = (e) => {
    let val = e.target.id
    if (ratingFilter[e.target.id] === true) {
      setRatingFilter((prevFilter) => {
        return {...prevFilter, [val]: false}})
    } else {
      setRatingFilter((prevFilter) => {
        return {...prevFilter, [val]: true}})
    }
  }

  // Rating breakdown Bar
  const stars = rating.map((obj, ind) => {
    return (
    <section key={ind}>

      <label data-testid="FilterStar">
        <small id={obj.id}
          data-testid={obj.id}
          value={obj.id}
          aria-label={obj.id}
          onClick={rateFilter}>
          {obj.id} stars
        </small>
      </label> &ensp;

      <meter className="rating-bar"
        value={obj.val}
        max={barTotal()}></meter>

      <small>
        <label className="star-vote">
          {obj.val}
        </label>
      </small>
    </section>
    )
  });

  return (
    <section data-testid="RatingBreakdown">
      <div className="avg-star-rating">
        <Stars
          avgRate={avgRate}
          productId={productId}/>
        {/* <big><b></b></big> */}
      </div>
      <div>
        <small>{barTotal()}&ensp;reviews</small>
      </div>
      <div className="ratingBreakdown" data-testid="RatingBreakdownBar">
        {stars}
      </div>
      <div className="ratingBreakdown-recommend">
        <p>{recommendPercent.toFixed(2)}% of reviews recommend this product</p>
      </div>
    </section>
  )
}

export default RatingBreakdown;