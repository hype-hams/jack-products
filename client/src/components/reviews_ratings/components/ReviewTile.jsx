import React from 'react';
import Stars from './Stars.jsx';
import ReviewHelpers from './ReviewHelpers.jsx';
import axios from 'axios';
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ReviewTile = ({revObj}) => {
  // revObj = {
  //   key:revObj.review_id,
  //   id:revObj.review_id,
  //   rating:revObj.rating,
  //   date:revObj.date,
  //   summary:revObj.summary,
  //   body:revObj.body,
  //   photos:revObj.photos,
  //   recommend:revObj.recommend,
  //   reviewerName:revObj.reviewer_name,
  //   response:revObj.response,
  //   helpfulness:revObj.helpfulness,
  // }
  const reviewStars = () => {
    const result= []
    for(let i = 0; i < 5; i++) {
      if(i < revObj.rating) {
      result.push(<FontAwesomeIcon icon={faStar} className="fa fa-star empty-star full-star" key={i}/>)
      } else {
        result.push(<FontAwesomeIcon icon={faStar} key={i+1337} className="fa fa-star empty-star" />)
      }
    }
    return result
  }

  const helpfulCheck = () => {
    let yescheck = document.getElementById('yeshelp');
    // let nocheck = document.getElementById('nohelp');
    if(yescheck.checked || nocheck.checked) {
      yescheck.disabled = true;
      // nocheck.disabled = true;
      document.getElementById('yestext').style.color = 'gray';
      // document.getElementById('notext').style.color = 'gray';
    }
    if(yescheck.checked) {
      //NEED TO GRAB HELPFULNESS DATA
      console.log('yes was checked  ')
      ReviewHelpers.markHelpful(revObj.review_id)
    }
  }

  const BodyLength = () => {
    let b250 = <span id="beforeshow">{revObj.body.substring(0, 250)}</span>
    let a250 = revObj.body.substring(250)
    let button;
    if(a250.length > 0) {
      button = <button
        onClick={() => {
          document.getElementById('beforeshow').innerText = revObj.body.substring(0, 250) + a250
          }}>Show more.s..</button>
    }
    return (
      <div><span id="beforeshow">{b250}
        {button}</span></div>
    )
  }

  const reportReview = () => {
    axios({
      method: 'PUT',
      url: '/api/reviews/:review_id/report',
      data: {review_id: revObj.review_id}
    })
      .then((response) => {
        console.log('review reported and removed pending investigation')
        return true
      })
  }

  return (
    <div>
      <form>
        <div>
          {reviewStars()}
        </div>

        <div className="review-namedate">
          {revObj.reviewer_name}&ensp;
          <small style={{color:'gray'}}>
            {ReviewHelpers.alterDate(revObj.date)}
          </small>
        </div>

        <div>
          <div className="review-summary">
            <b>{revObj.summary}</b>
          </div>

          <div className="review-body">
            <BodyLength />
          </div>
          <div className="seller-response">
            {ReviewHelpers.sellerResponse(revObj.response)}
          </div>

          <div className="recommend-product">
            {ReviewHelpers.checkRecommend(revObj.recommend)}
          </div>
        </div>
        <section>
          <div id="helpful-checker">
            <label>Was this helpful?</label>
            <input id="yeshelp"
              type="radio"
              value="yes"
              name="helpful"
              onClick={helpfulCheck}>
            </input><span id="yestext">Yes</span>
            {/* <input id="nohelp"
              type="radio"
              value="no"
              name="helpful"
              onClick={helpfulCheck}>
            </input><span id="notext">No</span>&ensp; */}
            <small className="helpful-review"
              style={{color:'green'}}>
              {revObj.helpfulness}&nbsp;
            </small>
            <small style={{color:'gray'}}>
              found this helpful
            </small>
          </div>
          <div className="report-review">
            <button type="button"
              onClick={reportReview}>Report Review</button>
          </div>

        </section>
      </form>
    </div>
  )
}
export default ReviewTile;