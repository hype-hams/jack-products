import React, {useState, useRef} from 'react';
import axios from 'axios';
import AddCharacteristics from './AddCharacteristics.jsx'
import '../review.css';


const Modal = ({showModal, setShowModal, productRating, productName, product}) => {
  const modalRef = useRef(null);
  const [bodyText, setBodyText] = useState('');
  const [minBody, setMinBody] = useState('50');

  //Characteristics Table
  const addChar = productRating.map((charObj, ind) =>     <AddCharacteristics charObj={charObj} key={ind}/>)
  //Text Area Handler
  const onChange = (e)=> {
    setBodyText(e.target.value);
    setMinBody('50'-bodyText.length);
    if(bodyText.length >= 50) {
    setMinBody('Minimum reached.');
    }
};

  return (

    <div className="modal-button">
      <button
        onClick={() => setShowModal(!showModal)}>
        Add Review
      </button>
    {showModal ? (
      <div className="modal-container"
        style={{
          position: "absolute",
          display: "flex",
          direction: "row",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: "100",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
        onClick={(e) => {
          if (modalRef.current.contains(e.target)) {
            return;
          }
          setShowModal(false);
        }}
      >
        <div style={{ backgroundColor: "white" }} ref={modalRef} className="modal-form">
          <form>
            <h1>Write Your Review</h1>
            <h3>About your {productName}</h3>
            <section className="stars">

            </section>
<br></br>
            <section className="recommend">
              <p>Do you recommend this product?
                <sup>*</sup>
              <input
                type="radio"
                value="yes"
                name="recommend"
                defaultChecked
              ></input>
                <span>Yes</span>
              <input
              type="radio"
              value="no"
              name="recommend"
            ></input>
              <span>No</span></p>
            </section>
<br></br>
            <section>
              <label>Characteristics
                <sup>*</sup>
              </label>
<br></br>
              {addChar}
            </section>
<br></br>
            <section className="review-summary">
              <label>Review Summary</label><br></br>
              <input name="summary"
                type="text"
                placeholder="Example: Best purchase ever!"
                size="30"
                maxLength="60"
                required />
            </section>
<br></br>
            <section className="review-body">
              <label>Review Body
                <sup>*</sup>
              </label><br></br>
              <textarea name="body"
              maxLength = '1000'
                required
                rows="10"
                cols="70"
                placeholder="Why did you like the product or not?"
                onChange={onChange}>
              </textarea><br></br>
                      <small style={{color:'gray'}}>
                        Minimum required characters left:{minBody}
                      </small>
            </section>
<br></br>
            <section className="upload">
              <label>Upload Photos</label> &ensp;
              <input type="file"
                name="photos"></input>
            </section>
<br></br>
            <section className="username">
              <label>Username:
              <sup>*</sup>
              </label>
              <input name="reviewer_name"
                type="text"
                placeholder="Example: jackson11!"
                size="30"
                maxLength="60"
                required
              ></input><br></br>
              <small style={{color:'gray'}}>For privacy reasons, do not use your full name or email address.</small>
            </section>
<br></br>
            <section className="email">
              <label>Email:
              <sup>*</sup>
              </label>
                <input name="email"
                  type="email"
                  placeholder="Example: jackson11@email.com"
                  size="30"
                  maxLength="60"
                  required
                ></input><br></br>
                <small style={{color:'gray'}}>For authentication reasons. You will not be emailed.</small>
            </section>
<br></br>
            {/* do not alter */}
            <button
              onClick={() => setShowModal(false)}>Cancel</button>
            <button
              type="submit">Submit Review</button>
          </form>
        </div>

      </div>
    ) : (
      <div></div>
    )}
  </div>

  )
}


export default Modal;