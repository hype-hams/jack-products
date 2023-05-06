import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Stars from './Stars.jsx';

Modal.setAppElement("#root");
const possibleStars = [1, 2, 3, 4, 5]
const AddReview = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [bodyText, setBodyText] = useState('');
  const [minBody, setMinBody] = useState('50');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0)

  const BuildStars = () => {
    return (
            <div className="stars">
              {possibleStars.map(rate => <i
                key={rate}
                className={"fas fa-star "
                + ((rate <= rating) ? 'in-rate ' : '')
                + ((rate <= hover) ? 'in-hover' : '')}
                onClick={() => setRating(rate)}
                onMouseEnter={() => {setHover(rate); setRating(null);}}
                onMouseLeave={() => setHover(null)}></i>)}
            </div>
    );
  }

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

          <div className="review-summary">
            <label>Review Summary</label><br></br>
            <input type="text"
              placeholder="Example: Best purchase ever!"
              size="30"
              maxLength="60"
              required></input>
          </div>
    <br></br>
          <div className="review-body">
            <label>Review Body</label><br></br>
            <textarea maxLength = '1000'
              required
              rows="10"
              cols="70"
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
                    <small style={{color:'gray'}}>
                      Minimum required characters left:{minBody}
                    </small>
          </div>
  <br></br>
          <div className="upload">
            <label>Upload Photos</label>
            <input type="file"></input>
          </div>
  <br></br>
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
  <br></br>
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
  <br></br>
          <button
            type="submit">Submit Review</button>
          <button type='button'
            onClick={toggleModal}
          >Cancel</button>
        </form>
      </Modal>
    </div>
  )

}

export default AddReview;