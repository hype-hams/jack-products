/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';

function AddToCart({ skus }) {
  const skusArr = Object.entries(skus)
    .map((item) => ({ sku_id: item[0], quantity: item[1].quantity, size: item[1].size }));

  return (
    <div className="selectors">
      <label>
        <select id="size-selector" defaultValue="SELECT SIZE">
          <option>SELECT SIZE</option>
          {skusArr.map((item) => (<option key={item.sku_id}>{item.size}</option>))}
        </select>
      </label>
      <label>
        <select id="quantity-selector" defaultValue="-">
          <option>-</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
      </label>
      <br />
      <button id="addToCart-btn">ADD TO BAG</button>
    </div>
  );
}

export default AddToCart;
