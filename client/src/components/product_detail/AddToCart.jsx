/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faPlus } from '@fortawesome/free-solid-svg-icons';

const axios = require('axios');

function AddToCart({ skus }) {
  const [size, setSize] = useState('SELECT SIZE');
  const [quantity, setQuantity] = useState('-');
  const [qtyOptions, setQtyOptions] = useState([]);
  const [sizeMenuOpen, setSizeMenuOpen] = useState(false);
  const [qtyMenuOpen, setQtyMenuOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [disable, setDisable] = useState(false);
  const sizeRef = useRef(null);
  const qtyRef = useRef(null);

  // close the dropdown menu anywhere on the page except itself and add-to-cart-btn
  const handleClickOnPage = (event) => {
    // if clicked item is button, we still want it open the size menu
    const button = document.querySelector('.add-to-cart-btn');
    if (button && !button.contains(event.target)) {
      if (sizeRef.current && !sizeRef.current.contains(event.target)) {
        setSizeMenuOpen(false);
      }
      if (qtyRef.current && !qtyRef.current.contains(event.target)) {
        setQtyMenuOpen(false);
      }
    }
  };

  useEffect(() => {
    // check null and set to out of stock
    if (!skus[0].size) {
      setSize('OUT OF STOCK');
      setDisable(true);
    } else {
      setSize('SELECT SIZE');
      setQuantity('-');
      setDisable(false);
      // handle close the menu when clicking on elsewhere
      document.body.addEventListener('click', handleClickOnPage);
    }
    setSizeMenuOpen(false);
    setQtyMenuOpen(false);
  }, [skus]);

  const handleQtyClick = (e) => {
    setQuantity(Number(e.target.innerText));
    setQtyMenuOpen(false);
    setSizeMenuOpen(false);
  };

  const handleSizeClick = (e) => {
    setQtyMenuOpen(false);
    setSize(e.target.innerText);
    if (e.target.innerText) {
      setQuantity(1);
      setSelectedId(e.target.getAttribute('data-sku_id'));
      const totalQty = Number(e.target.getAttribute('data-quantity'));
      const limit = totalQty > 15 ? 15 : totalQty;
      // create an array with numbers from 1 to limit and set it to quantity
      const qtyArr = [];
      for (let i = 0; i < limit; i += 1) {
        qtyArr.push(<section key={i + 1} onClick={handleQtyClick}>{i + 1}</section>);
      }
      setQtyOptions(qtyArr);
    }
  };

  const handleAddToCartClick = (e) => {
    e.preventDefault();
    if (size === 'SELECT SIZE' || selectedId === null) {
      setSizeMenuOpen(true);
    } else {
      console.log(`Adding sku_id: ${selectedId}, size: ${size}, quantity: ${quantity} to cart...`);
      const multipleRequestsBasedOnCounts = async () => {
        const promises = [];
        for (let i = 0; i < quantity; i += 1) {
          promises.push(axios.post('/api/cart', { sku_id: selectedId }));
        }
        const responses = await Promise.all(promises);
        responses.forEach((response, index) => {
          console.log(`Add to cart response${index + 1}: ${response.data}`);
        });
      };
      multipleRequestsBasedOnCounts();
    }
  };

  const disabledStyle = { color: 'rgb(192, 192, 192)' };

  return (
    <div className="selectors">
      <div className="size-selector-div" ref={sizeRef} style={disable ? disabledStyle : null} onClick={() => (disable ? null : setSizeMenuOpen(!sizeMenuOpen))}>
        {size}
        {!disable && <div className="toggle-dropdown"><FontAwesomeIcon icon={faAngleDown} style={{ color: '#ababab' }} /></div>}
      </div>

      <div className="quantity-selector-div" ref={qtyRef} style={disable ? disabledStyle : null} onClick={() => (disable ? null : setQtyMenuOpen(!qtyMenuOpen))}>
        {quantity}
        {!disable && <div className="toggle-dropdown"><FontAwesomeIcon icon={faAngleDown} style={{ color: '#ababab' }} /></div>}
      </div>

      {sizeMenuOpen && (
        <div className="size-dropdown-menu-div">
          {skus.map((item) => (
            <section
              key={item.sku_id}
              data-quantity={item.quantity}
              data-sku_id={item.sku_id}
              onClick={handleSizeClick}
            >
              {item.size}
            </section>
          ))}
        </div>
      )}
      {qtyMenuOpen && <div className="qty-dropdown-menu-div">{qtyOptions}</div>}
      <br />
      <button className="add-to-cart-btn" disabled={disable} style={disable ? disabledStyle : null} onClick={handleAddToCartClick}>
        ADD TO BAG
        {!disable && <FontAwesomeIcon icon={faPlus} beat style={{ color: '#bababa' }} />}
      </button>
    </div>
  );
}
export default AddToCart;
