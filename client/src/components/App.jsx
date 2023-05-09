/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */

import React, { useState, useEffect, createContext } from 'react';
import ProductDetail from './product_detail/Product_detail_main.jsx';

export const ProductContext = createContext(null);
/* using useContext instruction:
  import React, { useContext } from 'react';
  import { ProductContext } from '../App.jsx';
  const { product, setProduct } = useContext(ProductContext);
*/

const axios = require('axios');

function App(props) {
  const [product, setProduct] = useState([]);
  const [styles, setStyles] = useState([]);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDataById = async (id = 40346) => {
    try {
      setLoading(true); // clear the prev state
      // fetching Product data
      const productResponse = await fetch(`/api/products/${id}`);
      const productData = await productResponse.json();
      setProduct(productData);
      console.log('productData: ', productData);

      // fetching Product Styles data
      const styleResponse = await fetch(`/api/products/${id}/styles`);
      const styleData = await styleResponse.json();
      setStyles(styleData);
      console.log('styleData: ', styleData);

      // fetching Product Related data
      const relatedResponse = await fetch(`/api/products/${id}/related`);
      const relatedData = await relatedResponse.json();
      setRelated(relatedData);
      console.log('relatedData: ', relatedData);

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
            <ProductContext.Provider value={{ product, setProduct }}>
              <ProductDetail product={product} styles={styles} />
              <div className="related-items">
                <p>Fake Related Component</p>
                {related.map((item) => <div key={item} onClick={() => handleRelatedItemClick(item)}>{item}</div>)}
              </div>
            </ProductContext.Provider>
          </div>
        )
      }
    </div>
  );
}

export default App;
