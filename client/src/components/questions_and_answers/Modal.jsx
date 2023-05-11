import React from 'react';
import axios from 'axios';

function Modal({ closeModal }) {
  return (
    <div className="questionmodal-full">
      <div>
        <div className="questionmodal-container">
          <div className="questionmodal-close">
            <button
              type="button"
              onClick={() => {
                closeModal(false);
              }}
            >
              X

            </button>
          </div>
          <div className="questionmodal-title">
            <h2>Submit your Question</h2>
          </div>
          <div className="questionmodal-header">Enter Username</div>
          <form>
            <input type="text" id="questionmodal-username" placeholder="username" autoComplete="off" />
          </form>
          <div className="questionmodal-header">Enter Email</div>
          <form>
            <input type="text" id="questionmodal-email" placeholder="email" autoComplete="off" />
          </form>
          <div className="questionmodal-header">Ask your question here!</div>
          <form>
            <textarea rows="5" id="questionmodal-textarea" />
          </form>
          <div className="questionmodal-footer">
            <button
              type="button"
              id="cancelBtn"
              onClick={() => {
                closeModal(false);
              }}
            >
              Cancel

            </button>
            <button type="button">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Modal;
