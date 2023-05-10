/* eslint-disable padded-blocks */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import ProductDetail from './product_detail/Product_detail_main.jsx';
import ReviewRating from './reviews_ratings/components/ReviewRating.jsx';
import axios from 'axios';

function App() {

  const [product, setProduct] = useState('40344');
  const [productName, setProductName] = useState('Camo Onesie')
  // const [reviewList, setReviewList] = useState([])

  // const getProduct = () => {
  //   axios.get('/api/products/?product_id=40344')
  //   .then((response) => setProduct(response.data))
  // }
  // const getReviews = () => {
  //   axios.get(`/api/reviews?product_id=${product}`)
  //   .then((response) =>
  //   {console.log('get reviews on app jsx', response.data.results)
  //   setReviewList(response.data)})
  // }

  // useEffect(() => {
  //   getReviews()
  // },[])

  return (
    <div>
      <ReviewRating
        product={product}
        productName={productName}/>
    </div>
  );
}

export default App;
