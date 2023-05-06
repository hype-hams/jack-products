import React, {useState,useEffect} from 'react';
import ReviewList from './ReviewList.jsx';
import testData from '../testdata/reviewdata.json';

import AddReview from './AddReview.jsx';

const ReviewRating = () => {
  const [masterList, setMasterList] = useState([]);


  useEffect(() => {
    setMasterList(testData.results)
  }, [])

  return (
    <div>
      <h2>Ratings & Reviews</h2>

      <div>
        <div>
          <h4>Rating Breakdown</h4>
        </div>
        <div>
          <h4>Product Breakdown</h4>
        </div>
      </div>

      <div>
        <div>
          <ReviewList
          masterList={masterList}
          setMasterList={setMasterList}/>
        </div>

        <div>
          <AddReview />
        </div>
      </div>

    </div>
  )
};


export default ReviewRating;
