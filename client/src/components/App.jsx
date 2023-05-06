/* eslint-disable padded-blocks */
/* eslint-disable no-unused-vars */
import React from 'react';
import ProductDetail from './product_detail/Product_detail_main.jsx';


function App(props) {

  return (
    <div>
      <div className="ProductDetail">
        <ProductDetail />
      </div>
      <div className="RelatedItems">
        <RelatedItems />
      </div>
      <div className="Reviews">
        <MainList />
      </div>
      <div className="ReviewsAndRatings">
        <ReviewRating />
      </div>
    </div>
  );
};

// {/* <ProductDetail /> */}
export default App;
