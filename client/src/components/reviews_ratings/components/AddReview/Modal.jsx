import React, {useState, useRef} from 'react';
import axios from 'axios';
import AddCharacteristics from './AddCharacteristics.jsx'
import SetStars from './SetStars.jsx';
import UploadPhotos from './UploadPhotos.jsx';

const Modal = ({showModal, setShowModal, productRating, productName, productId}) => {
  const modalRef = useRef(null);
  //posting use state
  const [rating, setRating] = useState(0);
  const [recommend, setRecommend] = useState(true);
  const [characteristics, setCharacteristics] = useState({});
  const [summary, setSummary] = useState('');

  const [bodyText, setBodyText] = useState('');
  const [minBody, setMinBody] = useState('50');
  const [photos, setPhotos] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');


//chars,

  //Characteristics Table
  const addChar = productRating.map((charObj, ind) =>     <AddCharacteristics
    charObj={charObj}
    key={ind}
    characteristics={characteristics}
    setCharacteristics={setCharacteristics}/>)
  //Text Area Handler
  const onChange = (e)=> {
    setBodyText(e.target.value);
    setMinBody('50'-bodyText.length);
    if(bodyText.length >= 50) {
    setMinBody('Minimum reached.');
    }
};
//submit modal hanlde
  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   const form = {
  //     product_id: productId,
  //     rating: rating,
  //     summary: summary,
  //     body: bodyText,
  //     recommend: recommend,
  //     name: username,
  //     email: email,
  //     photos: photos,
  //     characteristics: characteristics
  //   }
  //   console.log('this is submission', form)
  //   axios.post(`./api/reviews?product_id=${form.product_id}`, form)
  //   .then(() => {
  //     console.log(`Posted review`)
  //     setShowModal(false)
  //   })
  //   .catch((err) => {
  //     console.log('failed to post review', err)
  //   })
  // }

  //Validate Form and submit
  const validateForm = (e) => {
    e.preventDefault()
    let validateRating = false;
    let validateChar = false;
    let validateBody = false;
    let validateName = false;
    let validateEmail = false;
    if(rating > 0) {
      validateRating = true
    }
    if(Object.keys(characteristics).length === productRating.length) {
      console.log('char is done')
      validateChar = true
    }
    if(bodyText.length >= 50 && bodyText.length <= 1000) {
      validateBody = true
    }
    if(username.length > 0) {
      validateName = true
    }
    if(email.length > 0 && email.includes('@') && email.includes('.')) {
      validateEmail = true
    }
    if(validateRating && validateChar && validateBody && validateName && validateEmail) {
      const form = {
        product_id: productId,
        rating: rating,
        summary: summary,
        body: bodyText,
        recommend: recommend,
        name: username,
        email: email,
        photos: photos,
        characteristics: characteristics
      }
      console.log('this is submission', form)
      axios.post(`./api/reviews?product_id=${form.product_id}`, form)
      .then(() => {
        console.log(`Posted review`)
        setShowModal(false)
      })
      .catch((err) => {
        console.log('failed to post review', err)
      })
    } else {
      let alertInfo = '';
      if(!validateChar) {
        alertInfo += 'Characteristics, '
      }
      if(!validateRating) {
        alertInfo += 'Product Rating, '
      }
      if(!validateBody) {
        alertInfo += 'Review Message, '
      }
      if(!validateName) {
        alertInfo += 'Username, '
      }
      if(!validateEmail) {
        alertInfo += 'Email, '
      }
      alertInfo = alertInfo.slice(0, -2)
      alert(`Please fill out these fields: ${alertInfo}`)
    }
  }

  return (
    <div className="modal-button">
      <button type="button"
        onClick={() => setShowModal(!showModal)}>
        Add Review
      </button>
    {showModal ? (
      <div className="Modal-backg"
        onClick={(e) => {
          if (modalRef.current.contains(e.target)) {
            return;
          }
          setShowModal(false);
        }}
      >
        <div ref={modalRef} className="Modal-inside">
          <form onSubmit={validateForm}>
            <h1>Write Your Review</h1>
            <h3>About your {productName}</h3>
            <section className="stars">
              <label><b>Star Rating</b></label>
              <SetStars rating={rating} setRating={setRating}/>
            </section>

<br></br>
            <section className="recommend"
              id="modal-recommend">
              <p>Do you recommend this product?
                <sup>*</sup>
              <input
                type="radio"
                value={true}
                name="recommend"
                defaultChecked
                onClick={()=>setRecommend(true)}
              ></input>
                <span>Yes</span>
              <input
              type="radio"
              value={false}
              name="recommend"
              onClick={()=>setRecommend(false)}
            ></input>
              <span>No</span></p>
            </section>
<br></br>
            <section>
              <label>Characteristics
                <sup>*</sup>
              </label>
<br></br>
              <section className="add-char-component">
                {addChar}
              </section>
            </section>
<br></br>
            <section className="review-summary">
              <label>Review Summary</label><br></br>
              <input name="summary"
                type="text"
                placeholder="Example: Best purchase ever!"
                size="30"
                maxLength="60"
                onChange={(e)=>{setSummary(e.target.value)}}
                />
            </section>
<br></br>
            <section className="review-body">
              <label>Review Body
                <sup>*</sup>
              </label><br></br>
              <textarea name="body"
              maxLength = '1000'

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
                <UploadPhotos photos={photos} setPhotos={setPhotos}/>
            </section>
<br></br>
            <section className="username">
              <label>Username:
              <sup>*</sup>
              </label>
              <input name="name"
                type="text"
                placeholder="Example: jackson11!"
                size="30"
                maxLength="60"
                onChange={(e)=>{setUsername(e.target.value)}}
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
                  onChange={(e)=>{setEmail(e.target.value)}}
                ></input><br></br>
                <small style={{color:'gray'}}>For authentication reasons. You will not be emailed.</small>
            </section>
<br></br>
            {/* do not alter */}
            <button type="button"
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
