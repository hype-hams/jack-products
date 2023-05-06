import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Stars from './Stars.jsx';

Modal.setAppElement("#root");

const AddReview = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [bodyText, setBodyText] = useState('');
  const [minBody, setMinBody] = useState('50');


  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="add-review">
      <button
        onClick={toggleModal}>Add Review</button>

      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="ReviewForm"
      >
        <form>
          <div className="product-name">
            <h2>Write Your Review</h2>
            <h3>About your PRODUCT_NAME_HERE</h3>
          </div>

          <div className="stars">Star Rating
          </div>

          <div className="recommend">
            <p>Do you recommend this product?
            <input
              type="radio"
              value="yes"
              defaultChecked
            ></input>
              <span>Yes</span>
            <input
            type="radio"
            value="no"
          ></input>
            <span>No</span></p>
          </div>

          <div>Characteristics</div>
          <div>Review Summar</div>

          <div className="review-body">
            <label>Review Body</label>
            <textarea maxLength = '1000'
              size="1000"
              placeholder = 'Why did you like the product or not?' onChange = {(e)=> {
                            setBodyText(e.target.value)
                            // let inputBodyLength = inputBody.split('').length;
                            // let minLeft = 50 - inputBodyLength;
                            // $('#counter-review-body').empty();
                            setMinBody('50'-bodyText.length)
                           if(bodyText.length >= 50) {
                            setMinBody('Minimum reached.')
                           }
                          }}>

             </textarea>
                    <p>Minimum required characters left:{minBody}</p>

            </div>

          <div className="upload">
            <label>Upload Photos</label>
            <input type="file"></input>
          </div>

          <div className="username">
            <label>Username:</label>
            <input type="text"
              placeholder="Example: jackson11!"
              size="30"
              maxLength="60"
              required
            ></input><br></br>
            <small style={{color:'gray'}}>For privacy reasons, do not use your full name or email address.</small>

          </div>

          <div className="email">
            <label>Email:</label>
              <input type="email"
                placeholder="Example: jackson11@email.com"
                size="30"
                maxLength="60"
                required
              ></input><br></br>
              <small style={{color:'gray'}}>For authentication reasons. You will not be emailed.</small>
          </div>

          <button
            type="submit">Submit Review</button>
        </form>
      </Modal>
    </div>
  )

}

export default AddReview;