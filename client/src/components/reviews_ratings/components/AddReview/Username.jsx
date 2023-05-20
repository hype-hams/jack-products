import React from 'react';

function Username({ setUsername }) {
  return (
    <section className="username">
      <label>
        Username:
        <sup>*</sup>
      </label>
      <input
        name="name"
        aria-label="username"
        type="text"
        placeholder="Example: jackson11!"
        size="30"
        maxLength="60"
        onChange={(e) => { setUsername(e.target.value); }}
      />
      <br />
      <small style={{ color: '#757575' }}>For privacy reasons, do not use your full name or email address.</small>
    </section>
  );
}

export default Username;
