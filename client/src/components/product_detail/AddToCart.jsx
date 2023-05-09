/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';

function AddToCart({ skus }) {
  // const [selectedSize, setSelectedSize] = useState('SELECT SIZE');
  const [selectedQty, setSelectedQty] = useState('-');
  const [sizeOptions, setSizeOptions] = useState(<option>SELECT SIZE</option>);
  const [qtyOptions, setQtyOptions] = useState(<option>-</option>);
  // If the size has not been selected, the Quantity Selector dropdown will be disabled.
  const [sizeDropdown, setSizeDropdown] = useState(false);
  const [qtyDropdown, setQtyDropdown] = useState(true);

  useEffect(() => {
    console.log('skus: ', skus);
    if (!skus[0].size) {
      setSizeDropdown(true);
      setSizeOptions(<option>OUT OF STOCK</option>);
    } else {
      const sizeOptionsArr = skus.map((item) => (
        <option key={item.sku_id} value={item.size}>{item.size}</option>));
      setSizeOptions([sizeOptions, ...sizeOptionsArr]);
    }
  }, []);

  const handleSizeChange = (e) => {
    const currentSize = e.target.value;
    console.log('currentSize', currentSize);
    if (currentSize === 'SELECT SIZE') {
      setQtyDropdown(true);
      setQtyOptions(<option>-</option>);
    } else {
      setQtyDropdown(false);
      const qtyForSelectedSize = skus.find((item) => item.size === currentSize).quantity;
      // The maximum selection has a hard limit of 15
      const limit = qtyForSelectedSize > 15 ? 15 : qtyForSelectedSize;
      const qtyOptionsArr = [];
      for (let i = 0; i < limit; i += 1) {
        qtyOptionsArr.push(<option key={i + 1} value={i + 1}>{i + 1}</option>);
      }
      setQtyOptions(qtyOptionsArr);
    }
  };

  const handleQtyChange = (e) => {
    setSelectedQty(e.target.value);
  };

  return (
    <div className="selectors">
      <label>
        <select id="size-selector" disabled={sizeDropdown} onChange={handleSizeChange}>
          {sizeOptions}
        </select>
      </label>
      <label>
        <select id="quantity-selector" disabled={qtyDropdown} value={selectedQty} onChange={handleQtyChange}>
          {qtyOptions}
        </select>
      </label>
      <br />
      <button id="addToCart-btn">ADD TO BAG</button>
    </div>
  );
}

export default AddToCart;
