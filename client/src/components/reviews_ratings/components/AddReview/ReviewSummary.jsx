import React from 'react';

function ReviewSummary({ setSummary }) {
  return (
    <section className="review-summary">
      <label>Review Summary</label>
      <br />
      <input
        name="summary"
        aria-label="summary-input"
        type="text"
        placeholder="Example: Best purchase ever!"
        size="30"
        maxLength="60"
        onChange={(e) => { setSummary(e.target.value); }}
      />
    </section>
  );
}

export default ReviewSummary;
