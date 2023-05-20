import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReviewHelpers from './ReviewHelpers.jsx';
import Stars from './Stars.jsx';
import PhotoModal from './PhotoModal.jsx';

function ReviewTile({ revObj, setReviewList, productId }) {
  const [revBody, setRevBody] = useState('');
  const [showMore, setShowMore] = useState(false);
  const [helpful, setHelpful] = useState(revObj.helpfulness);

  useEffect(() => {
    if (revObj.body.length > 250) {
      setRevBody(`${revObj.body.slice(0, 251)}`);
      setShowMore(true);
    } else {
      setRevBody(revObj.body);
    }
  }, [revObj.body]);

  const fullBody = () => {
    setShowMore(false);
    setRevBody(revObj.body);
  };
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
    const result = [];
    for (let i = 0; i < 5; i++) {
      if (i < revObj.rating) {
        result.push(<FontAwesomeIcon icon={faStar} className="fa fa-star empty-star full-star" key={i} />);
      } else {
        result.push(<FontAwesomeIcon icon={faStar} key={i + 1337} className="fa fa-star empty-star" />);
      }
    }
    return result;
  };

  const helpfulCheck = () => {
    const yescheck = document.getElementById(`yeshelp${revObj.review_id}`);
    if (yescheck.checked) {
      yescheck.disabled = true;
      document.getElementById('yestext').style.color = '#757575';
      setHelpful(helpful + 1);
    }
    if (yescheck.checked) {
      ReviewHelpers.markHelpful(revObj.review_id);
    }
  };

  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = 'images/image-not-found-icon.png';
  };

  const revPhotos = revObj.photos.map((photo) => <PhotoModal key={photo.id} url={photo.url} />);
  // REPORT REVIEW
  const reportReview = () => {
    axios({
      method: 'PUT',
      url: '/api/reviews/:review_id/report',
      data: { review_id: revObj.review_id },
    })
      .then((response) => {
        setReviewList((oldRev) => oldRev.filter((revTile) => revTile.review_id !== revObj.review_id));
      });
  };

  return (
    <div>
      <form
        className="review-tile"
        data-testid="review-tile"
      >

        <section className="review-star-name">
          <div className="review-stars">
            {reviewStars()}
            {/* <Stars productId={revObj.review_id} avgRate={revObj.rating}/> */}
          </div>

          <div className="review-namedate">
            {revObj.reviewer_name}
&ensp;
            <sup style={{ color: '#757575' }}>
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
            showMore ? (
              <button
                type="button"
                className="full-body-tile"
                onClick={fullBody}
              >
                Show More...
              </button>
            )
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
            <label>
              Was this helpful?
              <input
                id={`yeshelp${revObj.review_id}`}
                className="yeshelp"
                type="radio"
                value="yes"
                name="helpful"
                data-testid="helpfulCheck"
                onClick={helpfulCheck}
              />
              <span id="yestext">Yes</span>
            </label>
            <small
              className="helpful-review"
              style={{ color: 'green' }}
            >
              {helpful}
&nbsp;
            </small>
            <small style={{ color: '#757575' }}>
              found this helpful
            </small>
          </div>

          <div className="report-review" data-testid="reportReview">
            <button
              type="button"
              className="reporter"
              onClick={reportReview}
            >
              Report Review
            </button>
          </div>

        </section>
      </form>
    </div>
  );
}
export default ReviewTile;
