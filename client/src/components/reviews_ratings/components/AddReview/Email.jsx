import React from 'react';

function Email({ setEmail }) {
  return (
    <section className="email">
      <label>
        Email:
        <sup>*</sup>
      </label>
      <input
        name="email"
        aria-label="email"
        type="email"
        placeholder="Example: jackson11@email.com"
        size="30"
        maxLength="60"
        onChange={(e) => { setEmail(e.target.value); }}
      />
      <br />
      <small style={{ color: '#757575' }}>For authentication reasons. You will not be emailed.</small>
    </section>
  );
}

export default Email;
