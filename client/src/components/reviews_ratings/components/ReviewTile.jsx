import React from 'react';
import Stars from './Stars.jsx';
import ReviewHelpers from './ReviewHelpers.jsx';
import axios from 'axios';
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

  const helpfulCheck = () => {

    let yescheck = document.getElementById('yeshelp');
    let nocheck = document.getElementById('nohelp');
    if(yescheck.checked || nocheck.checked) {
      yescheck.disabled = true;
      nocheck.disabled = true;
      document.getElementById('yestext').style.color = 'gray';
      document.getElementById('notext').style.color = 'gray';
    }
    if(yescheck.checked) {
      //NEED TO GRAB HELPFULLES DATA
      console.log('yes was checked  ')
      ReviewHelpers.markHelpful(revObj.review_id)
    } else {
      console.log('no was checked')
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

  return (
    <div>
      <form>
        <div>
          {revObj.rating}
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
            <input id="nohelp"
              type="radio"
              value="no"
              name="helpful"
              onClick={helpfulCheck}>
            </input><span id="notext">No</span>&ensp;
            <small style={{color:'green'}}>
              {revObj.helpfulness}&nbsp;
            </small>
            <small style={{color:'gray'}}>
              found this helpful
            </small>
          </div>

        </section>
      </form>
    </div>
  )
}
export default ReviewTile;