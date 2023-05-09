/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useRef } from 'react';

const axios = require('axios');

function AddToCart({ skus }) {
  const [selectedSize, setSelectedSize] = useState('SELECT SIZE');
  const [selectedQty, setSelectedQty] = useState('-');
  const [sizeOptions, setSizeOptions] = useState(<option>SELECT SIZE</option>);
  const [qtyOptions, setQtyOptions] = useState(<option>-</option>);
  const [sizeDropdown, setSizeDropdown] = useState(false); // size dropdown default: able
  const [qtyDropdown, setQtyDropdown] = useState(true); // quantity dropdown default: disabled
  const [showButton, setShowButton] = useState(true);

  const selectRef = useRef(null);

  useEffect(() => {
    console.log('skus: ', skus);
    if (!skus[0].size) {
      setSizeDropdown(true); // no stock, diable size dropdown
      setSizeOptions(<option>OUT OF STOCK</option>);
      setShowButton(false); // no stock, hide button
    } else {
      const sizeOptionsArr = skus.map((item) => (
        <option key={item.sku_id} value={item.size}>{item.size}</option>));
      setSizeOptions([sizeOptions, ...sizeOptionsArr]);
    }
  }, []);

  // User changes size will affect Quantity Selector and Add-to-cart Button
  const handleSizeChange = (e) => {
    const currentSize = e.target.value;
    setSelectedSize(currentSize); // Add to cart button needs selectedSize
    // using currentSize instead of selectedSize because state updates are asynchronous
    if (currentSize === 'SELECT SIZE') {
      setQtyDropdown(true); // no size selected, disable quantity dropdown
      setQtyOptions(<option>-</option>); // change quantity option to '-'
    } else {
      setQtyDropdown(false); // size selected, enable quantity dropdown
      setSelectedQty(1); // Once a size has been selected, the quantity should default to 1.
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

  const handleAddToCartClick = (e) => {
    e.preventDefault();
    if (selectedSize === 'SELECT SIZE') {
      console.log('ref: ', selectRef.current);
      selectRef.current.click();
    } else {
      const id = skus.find((item) => item.size === selectedSize).sku_id;
      console.log(`Adding { sku_id: ${id}, count: ${selectedQty} } to cart.....`);
      // POST /cart only take sku_id as parameter, only add one count at a time.
      // If there's more counts need to be added, have to post multiple requests
      const multipleRequestsBasedOnCounts = async () => {
        const promises = [];
        for (let i = 0; i < selectedQty; i += 1) {
          promises.push(axios.post('/api/cart', { sku_id: id }));
        }
        const responses = await Promise.all(promises);
        responses.forEach((response) => {
          console.log('Add to cart response: ', response.data);
        });
      };
      multipleRequestsBasedOnCounts();
    }
  };

  return (
    <div className="selectors">
      <form>
        <label>
          <select id="size-selector" ref={selectRef} disabled={sizeDropdown} value={selectedSize} onClick={() => console.log('click')} onChange={handleSizeChange} required>
            {sizeOptions}
          </select>
        </label>
        <label>
          <select id="quantity-selector" disabled={qtyDropdown} value={selectedQty} onChange={handleQtyChange}>
            {qtyOptions}
          </select>
        </label>
      </form>
      <br />
      {showButton && <button id="addToCart-btn" onClick={handleAddToCartClick}>ADD TO BAG</button>}
    </div>
  );
}

export default AddToCart;
