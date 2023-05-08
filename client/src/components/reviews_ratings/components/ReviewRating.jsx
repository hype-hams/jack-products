import React, {useState,useEffect} from 'react';
import axios from 'axios';
import ReviewList from './ReviewList.jsx';
import testData from '../testdata/reviewdata.json';

import SortBar from './SortBar.jsx';
import AddReview from './AddReview/AddReview.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';

const ReviewRating = () => {
  const [masterList, setMasterList] = useState([]);
  const [sortBar, setSortBar] = useState('relevant');
  const [productRating, setProductRating] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [avgRate, setAvgRate] = useState('');
  const [rating, setRating] = useState([]);

  const getMeta = () => {
    axios.get('/api/reviews/meta?product_id=40344')
      .then(response => {
        console.log(Object.values(response.data.characteristics))
        console.log(Object.entries(response.data.ratings))
        setProductRating(Object.values(response.data.characteristics))
        setRecommended(response.data.recommended)
        //WILL GIVE OBJ
        // setRating(response.data.ratings)

          //WILL GIVE ARRAY OF OBJECTS
        setAvgRate(response.data.ratings)
        setRating(Object.entries(response.data.ratings).map(entry => { return {id: Number(entry[0]), val: Number(entry[1])}}).reverse())
      })

  }

  useEffect(() => {
    setMasterList(testData.results)
    getMeta()
  }, [])

  // let recommendLine = recommended.map((recObj, ind) =>
  //   <RatingBreakdown recObj={recObj} key={ind}/>)

  // let ratingTable = rating.map((rateObj, ind) =>
  //   <RatingBreakdown rateObj={rateObj} key={ind} />)

  let charTable = productRating.map((charObj, ind) =>     <ProductBreakdown charObj={charObj} key={ind}/>)
  // let rateTable = rating.map((rateObj, ind) =>     <RatingBreakdown rateObj={rateObj} key={ind} recommended={recommended}/>)

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
