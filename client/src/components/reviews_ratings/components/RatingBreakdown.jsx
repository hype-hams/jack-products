import React, {useState} from 'react';
import axios from 'axios';


const RatingBreakdown = ({rating, recommended, avgRate}) => {
  //avg = 1c+2c+3c+4c+5c/(count)
  let recommendPercent = Number(recommended.true)/(Number(recommended.true) + Number(recommended.false)) * 100;

  let totalRate = 0;
  let totalVal = 0;
  for(const key in avgRate) {
    totalRate += Number(avgRate[key]);
    totalVal += avgRate[key]*key;
  }
  let avg = (totalVal/totalRate).toFixed(2);


  const stars = rating.map((obj, ind) => (
    <section key={ind}>
      <label id={obj.id}>
        <small>{obj.id} stars</small>
      </label> &ensp;
      <meter value={obj.val} max="1000"></meter>
    </section>
  ));

  return (
    <section>
      <div>
        <p><big><b>{avg}</b></big></p>
        {/* TODO: style stars here */}
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