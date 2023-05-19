import React from 'react';

const ReviewSummary = ({setSummary}) => {

  return (
    <section className="review-summary">
      <label>Review Summary</label><br></br>
      <input name="summary"
        aria-label="summary-input"
        aria-selected="true"
        type="text"
        placeholder="Example: Best purchase ever!"
        size="30"
        maxLength="60"
        onChange={(e)=>{setSummary(e.target.value)}}
        />
  </section>
  )

}

export default ReviewSummary;