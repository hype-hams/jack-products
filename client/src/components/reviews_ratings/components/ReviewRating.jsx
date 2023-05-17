import React, {useState,useEffect} from 'react';
import axios from 'axios';
import ReviewList from './ReviewList.jsx';
import Modal from './AddReview/Modal.jsx';

import ProductBreakdown from './ProductBreakdown.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import SortBar from './SortBar.jsx';

const ReviewRating = ({productId, productName}) => {

  const [reviewList, setReviewList] = useState([]);
  const [productRating, setProductRating] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [avgRate, setAvgRate] = useState('');
  const [rating, setRating] = useState([]);
  const [dropSort, setDropSort] = useState('relevant');
//MODAL REDO
  const [showModal, setShowModal] = useState(false);
//RatingStarFilter
  const [ratingFilter, setRatingFilter] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false
  });
  const addReview = (e) => {
    e.preventDefault()
    setShowModal(!showModal)
    return <Modal showModal={showModal} setShowModal={setShowModal}/>
  }

  const getReviews = () => {
    axios.get('/api/reviews', {
      params: {
        product_id: productId,
        sort: dropSort,
        count: 1000
      }
    })
    .then((response) => {
      setReviewList(response.data)
    })
  }

  const getMeta = () => {
    axios.get(`/api/reviews/meta?product_id=${productId}`)
      .then(response => {
        setProductRating(Object.values(response.data.characteristics))
        setRecommended(response.data.recommended)
        //WILL GIVE OBJ
        setAvgRate(response.data.ratings)
        //WILL GIVE ARRAY OF OBJECTS
        setRating(Object.entries(response.data.ratings).map(entry => {
          return {
            id: Number(entry[0]), val: Number(entry[1])
          }
        }))
      })
      .catch((err) => {
        console.log('error on reviewrsating', err)
      })

  }

  useEffect(() => {
    getReviews()
    getMeta()
  }, [dropSort])


  let charTable = productRating.map((charObj, ind) =>     <ProductBreakdown charObj={charObj} key={ind}/>)

  const applyStars = () => {
    let starStr = ''
    for(let key in ratingFilter) {
      if(ratingFilter[key] === true) {
        starStr += `${key}, `
      }
    }
    // console.log('this is star string', starStr)
    //check star str
    if(starStr.length > 0) {
      starStr = starStr.slice(0, -2)
      return (
        <div>
          <p>Filtering reviews by {starStr} stars</p>
          <button type="button"
            onClick={(e) => {
              setRatingFilter({
                1: false,
                2: false,
                3: false,
                4: false,
                5: false
              })
            }}
            >Reset Filter</button>
        </div>
      )
    }

  }


  return (
    <div className="RR-module">
      <div className="breakdown-box">
        <div>
          <section className="breakdown">
            <h4>Rating Breakdown</h4>
            {applyStars()}

            <RatingBreakdown recommended={recommended}
              ratingFilter={ratingFilter}
              setRatingFilter={setRatingFilter}
              rating={rating}
              avgRate={avgRate}
              productId={productId}/>
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
            <SortBar
              setDropSort={setDropSort}/>

          <div className="review-list">
            <ReviewList
              ratingFilter={ratingFilter}
              reviewList={reviewList}
              dropSort={dropSort}
              setReviewList={setReviewList}
              productId={productId}/>
          </div>

          <div>
            <Modal showModal={showModal}
            productId={productId}
            productName={productName}
            productRating={productRating}
            setShowModal={setShowModal}/>
          </div>

        </div>

    </div>
  )
};


export default ReviewRating;