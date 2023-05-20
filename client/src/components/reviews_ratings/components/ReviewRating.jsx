import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewList from './ReviewList.jsx';
import Modal from './AddReview/Modal.jsx';

import ProductBreakdown from './ProductBreakdown.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import SortBar from './SortBar.jsx';

function ReviewRating({ productId, productName }) { // metaData prop
  const [reviewList, setReviewList] = useState([]);
  const [productRating, setProductRating] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [avgRate, setAvgRate] = useState('');
  const [rating, setRating] = useState([]);
  const [dropSort, setDropSort] = useState('relevant');
  const [ratingFilter, setRatingFilter] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  const getReviews = async () => {
    try {
      const response = await axios.get('/api/reviews', {
        params: {
          product_id: productId,
          sort: dropSort,
          count: 200,
        },
      });
      // .then((response) => {
      setReviewList(response.data);
    // })
    } catch (error) {
      console.log(error);
    }
  };

  const getMeta = () => {
    axios.get(`/api/reviews/meta?product_id=${productId}`)
      .then((response) => {
        // setMetaData(response.data)
        setProductRating(Object.values(response.data.characteristics));
        setRecommended(response.data.recommended);
        // WILL GIVE OBJ
        setAvgRate(response.data.ratings);
        // WILL GIVE ARRAY OF OBJECTS
        setRating(Object.entries(response.data.ratings).map((entry) => ({
          id: Number(entry[0]), val: Number(entry[1]),
        })));
      })
      .catch((err) => {
        console.log('error on reviewrsating', err);
      });
  };

  useEffect(() => {
    getReviews();
    getMeta();
  }, [dropSort]);

  const charTable = productRating.map((charObj, ind) => <ProductBreakdown charObj={charObj} key={ind} />);

  const applyStars = () => {
    let starStr = '';
    for (const key in ratingFilter) {
      if (ratingFilter[key] === true) {
        starStr += `${key}, `;
      }
    }
    // check star str
    if (starStr.length > 0) {
      starStr = starStr.slice(0, -2);
      return (
        <div>
          <p>
            Filtering reviews by
            {starStr}
            {' '}
            stars
          </p>
          <button
            type="button"
            onClick={(e) => {
              setRatingFilter({
                1: false,
                2: false,
                3: false,
                4: false,
                5: false,
              });
            }}
          >
            Reset Filter
          </button>
        </div>
      );
    }
  };

  return (
    <div className="RR-module">
      <div className="title-sort">
        <h2>Ratings & Reviews</h2>
      </div>

      <div className="top-sortbar">
        <SortBar
          setDropSort={setDropSort}
        />
      </div>

      <div className="breakdown-tile">
        <div className="breakdown-box">

          <div>
            <section className="breakdown rating-breakdown">
              <h3 className="break-head">Rating Breakdown</h3>
              {applyStars()}
              <RatingBreakdown
                recommended={recommended}
                ratingFilter={ratingFilter}
                setRatingFilter={setRatingFilter}
                rating={rating}
                avgRate={avgRate}
                total={reviewList.length}
                productId={productId}
              />
            </section>
          </div>

          <div>
            <section className="breakdown product-breakdown">
              <h3 className="break-head">Product Breakdown</h3>
              {charTable}
            </section>
          </div>

          <div>
            <Modal
              productId={productId}
              productName={productName}
              productRating={productRating}
            />
          </div>
        </div>

        <div className="review-box">
          {/* <SortBar
                setDropSort={setDropSort}/> */}
          <div className="review-list">
            <ReviewList
              ratingFilter={ratingFilter}
              reviewList={reviewList}
              setReviewList={setReviewList}
              productId={productId}
            />
          </div>

        </div>
      </div>

    </div>
  );
}

export default ReviewRating;
