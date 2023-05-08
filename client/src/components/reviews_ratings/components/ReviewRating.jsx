import React, {useState,useEffect} from 'react';
import axios from 'axios';
import ReviewList from './ReviewList.jsx';
import testData from '../testdata/reviewdata.json';

import SortBar from './SortBar.jsx';
import AddReview from './AddReview/AddReview.jsx';
import ProductBreakdown from './ProductBreakdown.jsx'

const ReviewRating = () => {
  const [masterList, setMasterList] = useState([]);
  const [sortBar, setSortBar] = useState('relevant');
  const [productRating, setProductRating] = useState([])

  const getMeta = () => {
    axios.get('/api/reviews/meta?product_id=40344')
      .then(response => {
        console.log(Object.values(response.data.characteristics))
        setProductRating(Object.values(response.data.characteristics))
      })
  }

  useEffect(() => {
    setMasterList(testData.results)
    getMeta()
  }, [])

  let charTable = productRating.map((charObj, ind) => <ProductBreakdown charObj={charObj} key={ind}/>)

  //ratings filter needs to pass down without without influence on sorbar. should combo
  return (
    <div>
      <h2>Ratings & Reviews</h2>

      <div>
        <div>
          <section><h4>Rating Breakdown</h4></section>
        </div>
        <div>
          <section>
            <h4>Product Breakdown</h4>
            {charTable}
          </section>
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
