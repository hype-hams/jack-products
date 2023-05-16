import React, {useState, useEffect} from 'react';
import Stars from './Stars.jsx';
import ReviewHelpers from './ReviewHelpers.jsx';
import axios from 'axios';
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ReviewTile = ({revObj, setReviewList, productId}) => {
  const [revBody, setRevBody] = useState('');
  const [showMore, setShowMore] = useState(false);

  useEffect (() => {
    if(revObj.body.length > 250) {
      setRevBody(`${revObj.body.slice(0, 251)}`)
      setShowMore(true)
    } else {
      setRevBody(revObj.body)
    }
  }, [revObj.body])
  const fullBody = () => {
    setShowMore(false);
    setRevBody(revObj.body);
  }
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
    let yescheck = document.getElementById('yeshelp' + revObj.review_id );
    // let nocheck = document.getElementById('nohelp');
    console.log('helpful check id name', yescheck)
    console.log('this is tile review obj', revObj)
    if(yescheck.checked) {
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

  const revPhotos = revObj.photos.map((photo) => {
    return <img className="review-photo"
      src={photo.url}
      key={photo.id}
      alt=""
      height="100"
      width="auto" />
  });

  //REPORT REVIEW
  const reportReview = () => {
    axios({
      method: 'PUT',
      url: '/api/reviews/:review_id/report',
      data: {review_id: revObj.review_id}
    })
      .then((response) => {
        console.log('review reported and removed pending investigation')
        setReviewList(oldRev => {
          return oldRev.filter(revTile => revTile.review_id !== revObj.review_id)
        })
      });
  }

  return (
    <div>
      <form className="review-tile">
        <section className="review-star-name">
          <div className="review-stars">
            {reviewStars()}
            {/* <Stars productId={revObj.review_id} rating={revObj.rating}/> */}
          </div>

          <div className="review-namedate">
            {revObj.reviewer_name}&ensp;
            <sup style={{color:'gray'}}>
              {ReviewHelpers.alterDate(revObj.date)}
            </sup>
          </div>
        </section>

        <div>
          <div className="review-summary">
            <b>{revObj.summary}</b>
          </div>

          <div className="review-body">
            {revBody}
          </div>
          {
            showMore ? <button type="button"
              className="full-body-tile"
              onClick={fullBody}>Show More...</button>
              : null
          }

          <div className="posted-image">
            {
              revPhotos.length !== 0 ? revPhotos
              : null
            }
          </div>

          <div className="seller-response">
            {ReviewHelpers.sellerResponse(revObj.response)}
          </div>

          <div className="recommend-product">
            {ReviewHelpers.checkRecommend(revObj.recommend)}
          </div>
        </div>
        <section className="tile-helpful-report">
          <div id="helpful-checker">
            <label>Was this helpful?</label>
            <input id={"yeshelp" + revObj.review_id}
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