import React from 'react';
import axios from 'axios';

const helpfulChecker = {};

const ReviewHelpers = {

  checkRecommend: (recommend) => {
    if(recommend) {
      return (
        <p>I recommend this product.</p>
      )
    }
  },
  sellerResponse: (response) => {
    if(response !== null) {
      return (
        <div>
          <h4><b>Response from seller</b></h4>
          <p>{response}</p>
        </div>
      )
    }
  },
  checkHelpfulness: (review_id) => {
    if(helpfulChecker[review_id]) {
      return true
    } else {
      return false
    }
  },
  markHelpful: (review_id) => {
    axios({
      method: 'PUT',
      url: '/api/reviews/:review_id/helpful',
      headers: {Authorization: process.env.API_KEY},
      data: {review_id: review_id}
    })
      .then((response) => {
        res.status(201).send(true)
      })
  },
  productBreakdown: () => {
    //comfort quality = poor - comfort
    //size, width, length, fit = small - large
  }






}


export default ReviewHelpers
