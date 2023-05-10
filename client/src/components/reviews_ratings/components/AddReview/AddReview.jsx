import React, {useState} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import AddCharacteristics from './AddCharacteristics.jsx'
// import Stars from './Stars.jsx';

Modal.setAppElement("#root");

const AddReview = ({productRating, productName, productId}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bodyText, setBodyText] = useState('');
  const [minBody, setMinBody] = useState('50');

  //Modal Toggler
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  //Characteristics Table
  const addChar = productRating.map((charObj, ind) =>     <AddCharacteristics charObj={charObj} key={ind}/>)

  const handleSubmit = (e) => {
    e.preventDefault();
    // let revForm = {
    //   product_id: {productId},
    //   rating: ,
    //   summary: ,
    //   body: ,
    //   recommend ,
    //   name: ,
    //   email: ,
    //   photos: [],
    //   characteristics: {}
    // }
    const form = e.target
    console.log('this is form before transform', form)
    const formData = new FormData(form)
    console.log('this is the review form submission', formData)
    // axios.post(`/api/reviews?product_id=${product}`, {body: formData})
    //   .then(() => {
    //     console.log('posted to db')
    //   })
    // const formJson = Object.fromEntries(formData.entries());
    // console.log('this is form', formJson);
  }

  const onChange = (e)=> {
      setBodyText(e.target.value);
      setMinBody('50'-bodyText.length);
      if(bodyText.length >= 50) {
      setMinBody('Minimum reached.');
      }
  }

  return (
    <div className="add-review">
      <button
        method="post"
        onClick={toggleModal}>Add Review</button>

      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="ReviewForm">
        <form
          onSubmit={handleSubmit}>
          <div className="product-name">
            <h2>Write Your Review</h2>
            <h3>About your {productName}</h3>
          </div>

          <div className="stars">Star Rating

          </div>
  <br></br>
          <div className="recommend">
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
          </div>
  <br></br>
          <div>
            <label>Characteristics
              <sup>*</sup>
            </label>
          <br></br>
            {addChar}
          </div>
  <br></br>
          <div className="review-summary">
            <label>Review Summary</label><br></br>
            <input name="summary"
              type="text"
              placeholder="Example: Best purchase ever!"
              size="30"
              maxLength="60"
              required />
          </div>
  <br></br>
          <div className="review-body">
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
             </textarea>
                    <small style={{color:'gray'}}>
                      Minimum required characters left:{minBody}
                    </small>
          </div>
  <br></br>
          <div className="upload">
            <label>Upload Photos</label> &ensp;
            <input type="file"
              name="photos"></input>
          </div>
  <br></br>
          <div className="username">
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
          </div>
  <br></br>
          <div className="email">
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
          </div>
  <br></br>
          <button type='button'
            onClick={toggleModal}
          >Cancel</button>
          <button
            type="submit">Submit Review</button>

        </form>
      </Modal>
    </div>
  )

}

export default AddReview;