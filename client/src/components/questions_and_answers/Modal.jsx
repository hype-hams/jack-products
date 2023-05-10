import React from 'react';

function renderModal({ isOpen, style, onRequestClose, contentLabel }) {
  return (
    <div>
      <h2>Hello</h2>
      <button type="button" onClick={onRequestClose}>Close</button>

      <div>Enter Username</div>
      <form>
        <input type="text" id="question-username" placeholder="username" autoComplete="off" />
      </form>
      <div>Enter Email</div>
      <form>
        <input type="text" id="question-email" placeholder="email" autoComplete="off" />
      </form>
      <div>Ask your question here!</div>
      <form>
        <input type="text" id="question-body" placeholder="Write here" autoComplete="off" />
      </form>
    </div>
  );
}
export default renderModal;
