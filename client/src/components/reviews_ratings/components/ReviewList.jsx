import React, {useState, useEffect} from 'react';
import axios from 'axios';
// import testData from '../testdata/reviewdata.json';
import ReviewTile from './ReviewTile.jsx';

const ReviewList = ({reviewList}) => {



    let alteredList = reviewList
        .map((revObj, ind) => <ReviewTile
                              revObj={revObj}
                              key={ind}
                              />)
  return (
    <div>
        <div>
        {
          alteredList.length !== 0 ? alteredList
          : <p>no reviews found</p>
        }
        </div>
    </div>
  );
}
export default ReviewList;
