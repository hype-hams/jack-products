import React, {useState,useEffect} from 'react';
import axios from 'axios';
import ReviewList from './ReviewList.jsx';
// import testData from '../testdata/reviewdata.json';
import Modal from './AddReview/Modal.jsx';
import './review.css'

import ProductBreakdown from './ProductBreakdown.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import SortBar from './SortBar.jsx';

const ReviewRating = ({product, productName}) => {

  const [reviewList, setReviewList] = useState([]);
  const [productRating, setProductRating] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [avgRate, setAvgRate] = useState('');
  const [rating, setRating] = useState([]);

  const [dropSort, setDropSort] = useState('relevant');
//MODAL REDO
  const [showModal, setShowModal] = useState(false);

  const addReview = (e) => {
    e.preventDefault
    setShowModal(!showModal)
    return <Modal showModal={showModal} setShowModal={setShowModal}/>
  }

  const getReviews = () => {
    axios.get('/api/reviews', {
      params: {
        product_id: product,
        sort: dropSort,
        count: 5
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
    <div className="RR-module">
      <h2>Ratings & Reviews</h2>

      <div className="breakdown-box">
        <div>
          <section className="breakdown">
            <h4>Rating Breakdown</h4>
            {/* {rateTable} */}
            <RatingBreakdown recommended={recommended} rating={rating} avgRate={avgRate} product={product}/>
          </section>
        </div>
        <div>
          <section className="breakdown">
            <h4>Product Breakdown</h4>
            {charTable}
          </section>
        </div>
      </div>

      <div className="review-box">
        <header><b>Reviews</b></header>
        <SortBar
          setDropSort={setDropSort}/>
        <div>
          <ReviewList
            reviewList={reviewList}/>
        </div>

        <div>
          <Modal showModal={showModal}
          product={product}
          productName={productName}
          productRating={productRating}
          setShowModal={setShowModal}/>
        </div>

      </div>

    </div>
  )
};


export default ReviewRating;
