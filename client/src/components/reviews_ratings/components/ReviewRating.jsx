import React, {useState,useEffect} from 'react';
import ReviewList from './ReviewList.jsx';
import testData from '../testdata/reviewdata.json';

import SortBar from './SortBar.jsx';
import AddReview from './AddReview/AddReview.jsx';

const ReviewRating = () => {
  const [masterList, setMasterList] = useState([]);
  const [sortBar, setSortBar] = useState('relevant');

  useEffect(() => {
    setMasterList(testData.results)
  }, [])

  //ratings filter needs to pass down without without influence on sorbar. should combo
  return (
    <div>
      <h2>Ratings & Reviews</h2>

      <div>
        <div>
          <section><h4>Rating Breakdown</h4></section>
        </div>
        <div>
          <section><h4>Product Breakdown</h4></section>
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
