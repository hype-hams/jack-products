import React from 'react';
import axios from 'axios';

const ReviewHelpers = {

  checkRecommend: (recommend) => {
    if(recommend) {
      return (
        <p>I recommend this product. <span style={{color:'green'}}>&#10003;</span></p>
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
  markHelpful: (review_id) => {
    axios({
      method: 'PUT',
      url: '/api/reviews/:review_id/helpful',
      data: {review_id: review_id}
    })
      .then((response) => {
        return true
      })
  },


  alterDate: (date) => {
    return new Date(date)
      .toLocaleDateString('en-US',
        {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
  }




}


export default ReviewHelpers
