import React, {useState,useEffect} from 'react';
import axios from 'axios';
import ReviewList from './ReviewList.jsx';
// import testData from '../testdata/reviewdata.json';

import AddReview from './AddReview/AddReview.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import SortBar from './SortBar.jsx';

const ReviewRating = ({product}) => {

  const [reviewList, setReviewList] = useState([]);
  const [productRating, setProductRating] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [avgRate, setAvgRate] = useState('');
  const [rating, setRating] = useState([]);

  const [dropSort, setDropSort] = useState('relevant');

  const getReviews = () => {
    axios.get('/api/reviews', {
      params: {
        product_id: product,
        sort: dropSort,
        count: 100
      }
    })
    .then((response) => {
      console.log('review rating get req', response.data)
      setReviewList(response.data)
    })
  }

  const getMeta = () => {
    axios.get(`/api/reviews/meta?product_id=${product}`)
      .then(response => {
        // console.log('chars',(response.data.characteristics))
        // console.log(Object.entries(response.data.ratings))
        setProductRating(Object.values(response.data.characteristics))
        setRecommended(response.data.recommended)
        //WILL GIVE OBJ
        setAvgRate(response.data.ratings)
        //WILL GIVE ARRAY OF OBJECTS
        setRating(Object.entries(response.data.ratings).map(entry => { return {id: Number(entry[0]), val: Number(entry[1])}}).reverse())
      })

  }

  useEffect(() => {
    getReviews()
    getMeta()
  }, [dropSort])


  let charTable = productRating.map((charObj, ind) =>     <ProductBreakdown charObj={charObj} key={ind}/>)


  //ratings filter needs to pass do wn without without influence on sorbar. should combo
  return (
    <div>
      <h2>Ratings & Reviews</h2>

      <div>
        <div>
          <section>
            <h4>Rating Breakdown</h4>
            {/* {rateTable} */}
            <RatingBreakdown recommended={recommended} rating={rating} avgRate={avgRate}/>
          </section>
        </div>
        <div>
          <section>
            <h4>Product Breakdown</h4>
            {charTable}
          </section>
        </div>
      </div>

      <div>
        <header>Reviews</header>
        <SortBar dropSort={dropSort}
        setDropSort={setDropSort}/>
        <div>
          <ReviewList
            setReviewList={setReviewList}
            reviewList={reviewList}/>
        </div>

        <div>
          <AddReview productRating={productRating}/>
        </div>
      </div>

    </div>
  )
};


export default ReviewRating;
