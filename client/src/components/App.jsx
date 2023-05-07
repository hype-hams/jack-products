/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable padded-blocks */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ProductDetail from './product_detail/Product_detail_main.jsx';

const axios = require('axios');

function App(props) {
  const [product, setProduct] = useState([]);
  const [styles, setStyles] = useState([]);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDataById = async (id = 40346) => {
    try {
      setLoading(true);
      const productResponse = await fetch(`/api/products/${id}`);
      const productData = await productResponse.json();
      setProduct(productData);
      console.log('productData: ', productData);

      const styleResponse = await fetch(`/api/products/${id}/styles`);
      const styleData = await styleResponse.json();
      setStyles(styleData);
      // console.log('styleData: ', styleData);

      const relatedResponse = await fetch(`/api/products/${id}/related`);
      const relatedData = await relatedResponse.json();
      setRelated(relatedData);
      // console.log('relatedData: ', relatedData);
      setLoading(false);
    } catch (err) {
      console.log('Error occurs in fetching data: ', err);
    }
  };

  const handleRelatedItemClick = (itemId) => {
    console.log(itemId, ' is clicked!');
    fetchDataById(itemId);
  };

  useEffect(() => {
    fetchDataById();
  }, []);

  return (
    <div>
      {
        loading ? (
          <div> loading...</div>
        ) : (
          <div>
            <ProductDetail product={product} styles={styles} />
            <div className="related-items">
              <p>Fake Related Component</p>
              {related.map((item) => <div key={item} onClick={(e) => handleRelatedItemClick(item)}>{item}</div>)}
            </div>
          </div>
        )
      }
    </div>
  );
}

export default App;
