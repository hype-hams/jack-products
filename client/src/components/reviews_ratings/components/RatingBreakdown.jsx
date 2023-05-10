import React, {useState} from 'react';
import axios from 'axios';
import Stars from './Stars.jsx';

const RatingBreakdown = ({rating, recommended, avgRate, product}) => {
  let recommendPercent = Number(recommended.true)/(Number(recommended.true) + Number(recommended.false)) * 100;

  let totalVal = 0;
  for(const key in avgRate) {
    totalVal += avgRate[key]*key;
  }
  //Rating breakdown Bar
  const stars = rating.map((obj, ind) => (
    <section key={ind}>
      <label id={obj.id}>
        <small>{obj.id} stars</small>
      </label> &ensp;
      <meter value={obj.val} max="1000"></meter>&ensp;
      {/* TODO COLOR CHANGE */}
      <small><label>{obj.val}</label></small>
    </section>
  ));
  //Rating Click Filter
  // const starFilter = () => {}

  return (
    <section>
      <div>
        <Stars product={product}/>
        {/* TODO: style stars here */}
        <small>{totalVal}&ensp;reviews</small>
      </div>
      <div>
        <p>{recommendPercent.toFixed(2)}% of reviews recommend this product</p>
      </div>
      <div className="ratingbreakdown">
        {stars}
      </div>
    </section>
  )
}

export default RatingBreakdown;