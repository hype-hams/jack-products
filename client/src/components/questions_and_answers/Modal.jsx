import React from 'react';
import axios from 'axios';

const { useState } = React;

function Modal({ closeModal, modalType, product_id, setIsOpen }) {

  // console.log(product_id);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');


  const resetStates = () => {
    setUsername('');
    setEmail('');
    setBody('');
  };

  const modalData = {};
  if (modalType === 'Question') {
    modalData.title = 'Submit your Question';
    modalData.body = 'Ask your question here!';
  } else {
    modalData.title = 'Submit your Response';
    modalData.body = 'Compose your Answer here!';
  }


  const submitQuestion = () => {
    // console.log(modalType)
    // console.log('Question submission')
    axios.post('/api/q_a/ask', {
      product_id: product_id,
      body: body,
      email: email,
      name: username,
    })
    .then(() => {
      resetStates();
      closeModal(false);
      document.querySelector('body').style.overflow = 'visible';
    })
    .catch((err) => {
      console.error('ERROR IN QUESTION SUBMISSION:  ', err);
    });
  };

  const submitAnswer = () => {
    // console.log(modalType[0])

    axios.post('/api/q_a/reply', {
      question_id: modalType[1].question_id,
      body: body,
      name: username,
      email: email,
      photos: []
    })
    .then(() => {
      resetStates();
      closeModal(false);
      document.querySelector('body').style.overflow = 'visible';
    })
    .catch((err) => {
      console.error('ERROR IN ANSWER SUBMISSION:  ', err);
    })
  };

  return (
    <div className="questionmodal-full">
      <div>
        <div className="questionmodal-container">
          <div className="questionmodal-close">
            <button
              type="button"
              onClick={() => {
                closeModal(false);
                document.querySelector('body').style.overflow = 'visible';
              }}
            >
              X
            </button>
          </div>
          <div className="questionmodal-title">
            <h2>{modalData.title}</h2>
          </div>
          <div className="questionmodal-header">Enter Username</div>
          <form id="Modalentry">
            <input maxLength="60" type="text" id="questionmodal-username" required placeholder="username" autoComplete="off" value={username} onChange={(u) => {
              u.preventDefault();
              setUsername(u.target.value);
            }} />
            <div className="questionmodal-header">Enter Email</div>
            <input maxLength="60" type="text" id="questionmodal-email" required placeholder="email" autoComplete="off" value={email} onChange={(e) => {
              e.preventDefault();
              setEmail(e.target.value);
            }}/>
            <div className="questionmodal-header">{modalData.body}</div>
            <textarea maxLength="1000" rows="5" id="questionmodal-textarea" required placeholder="Why did you like the product or not?" value={body} onChange={(b) => {
              b.preventDefault();
              setBody(b.target.value);
            }}/>
            <span className="QAauth">For authentification reasons, you will not be emailed</span>
          </form>
          <div className="questionmodal-footer">
            <button
              type="submit"
              id="Qsubmission"
              onClick={() => {
                if (modalType[0] === 'Question') {
                  submitQuestion();
                } else {
                  submitAnswer();
                }
              }}
            >
              Submit

            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Modal;
