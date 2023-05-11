import React, {useState} from 'react';
import axios from 'axios';
import Stars from './Stars.jsx';

const RatingBreakdown = ({rating, recommended, setRatingFilter, avgRate, productId}) => {
  let recommendPercent = Number(recommended.true)/(Number(recommended.true) + Number(recommended.false)) * 100;

  const totalRatings = () => {
    let totalVal = 0;
      for(const key in avgRate) {
        totalVal += avgRate[key]*key;
      }
      return totalVal
  }



  // Rating breakdown Bar
  const stars = rating.map((obj, ind) => (
    <section key={ind}>
      <label id={obj.id}>
        <small
          onClick={(e)=>{setRatingFilter(e.target.value)}}>
          {obj.id} stars
        </small>
      </label> &ensp;
      <meter className="rating-bar"
        value={obj.val}
        max="1000"></meter>
      {/* TODO COLOR CHANGE */}
      <small>
        <label className="rating-number">
          {obj.val}
        </label>
      </small>
    </section>
  ));

  //Rating Click Filter
  // const starFilter = () => {}

  return (
    <section>
      <div>
        <Stars rating={rating}
          productId={productId}/>
        {/* TODO: style stars here */}
        <small>{totalRatings()}&ensp;reviews</small>
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