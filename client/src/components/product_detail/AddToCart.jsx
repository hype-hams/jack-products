/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

function AddToCart({ skus }) {
  const [selectedSize, setSelectedSize] = useState('SELECT SIZE');
  const [selectedQty, setSelectedQty] = useState('-');
  const [qtyOptions, setQtyOptions] = useState([]);

  const skusArr = Object.entries(skus)
    .map((item) => ({ sku_id: item[0], quantity: item[1].quantity, size: item[1].size }));
  // console.log('skusArr: ', skusArr);

  const handleSizeChange = (e) => {
    const size = e.target.value;
    setSelectedSize(size);
    if (size !== 'SELECT SIZE') {
      setSelectedQty(1);
    }
  };

  const renderOptions = skusArr.filter((item) => item.size === selectedSize);
  console.log(renderOptions);
  return (
    <div className="selectors">
      <label>
        <select
          id="size-selector"
          value={selectedSize}
          onChange={handleSizeChange}
        >
          <option>SELECT SIZE</option>
          {skusArr.map((item) => (
            <option key={item.sku_id}>
              {item.size}
            </option>
          ))}
        </select>
      </label>
      <label>
        <select id="quantity-selector" defaultValue="-">
          <option>-</option>
        </select>
      </label>
      <br />
      <p>{selectedSize}</p>
      <button id="addToCart-btn">ADD TO BAG</button>
    </div>
  );
}

export default AddToCart;
