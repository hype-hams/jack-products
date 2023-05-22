import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewTile from './ReviewTile.jsx';
import SortBar from './SortBar.jsx';

function ReviewList({
  productId, ratingFilter, reviewList, setReviewList, dropSort,
}) {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleScroll = () => {
    // stub of object instead of window
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight || isLoading) {

    }
    // getReviews();
  };
  const starFilter = () => {
    const result = [];
    for (const key in ratingFilter) {
      if (ratingFilter[key] === true) {
        result.push(Number(key));
      }
    }
    return result;
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  // useEffect(() => {
  //   getReviews()
  // }, [dropSort])

  const alteredList = reviewList
    .filter((tile) => {
      if (starFilter().length > 0) {
        return starFilter().includes(tile.rating) === true;
      }
      return true;
    })
    .map((revObj, ind) => (
      <ReviewTile
        productId={productId}
        setReviewList={setReviewList}
        revObj={revObj}
        key={ind}
      />
    ));

  return (
    <div>
      <div>
        {/* <SortBar
              setDropSort={setDropSort}/> */}
      </div>
      <div
        className="infinite-reviews"
        data-testid="ReviewList"
      >
        {
          alteredList.length !== 0 ? alteredList
            : <p>no reviews found</p>
        }
      </div>
      <section>
        {isLoading && <p>Loading...</p>}
        {error && (
        <p>
          Error:
          {error.message}
        </p>
        )}
      </section>
    </div>
  );
}
export default ReviewList;
