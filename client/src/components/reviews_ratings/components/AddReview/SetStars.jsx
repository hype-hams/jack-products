import React, { useState, useEffect } from 'react';

function SetStars({ rating, setRating }) {
  const [hover, setHover] = useState(0);
  const [ratingDescription, setRatingDescription] = useState('');

  useEffect(() => {
    if (rating === 5) {
      setRatingDescription('Great');
    } else if (rating === 4) {
      setRatingDescription('Good');
    } else if (rating === 3) {
      setRatingDescription('Average');
    } else if (rating === 2) {
      setRatingDescription('Fair');
    } else if (rating === 1) {
      setRatingDescription('Poor');
    }
  }, [rating]);

  return (
    <section className="stars">
      <label><b>Star Rating</b></label>
      <div
        className="star-rating"
        data-testid="ModalSetStars"
      >
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              id="personal-rating"
              name="rating"
              type="button"
              key={index}
              className={index <= (hover || rating) ? 'on' : 'off'}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
        {' '}
&ensp;
        {ratingDescription}
      </div>
    </section>
  );
}

export default SetStars;
