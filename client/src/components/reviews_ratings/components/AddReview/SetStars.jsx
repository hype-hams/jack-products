import React, {useState, useEffect} from 'react';
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//1 star - “Poor”
	// 2 stars - “Fair”
	// 3 stars - “Average”
	// 4 stars - “Good”
	// 5 stars - “Great”

const SetStars = ({rating, setRating}) => {
  // const [personalRating, setPersonalRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [ratingDescription, setRatingDescription] = useState('')

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
  },[rating])

  // const clickHandle = (index) => {
  //   setRating(index)
  //   return (
  //   <div>{ratingDescription}</div>
  //   )
  // }
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button id="personal-rating"
            name="rating"
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })} &ensp;
        {ratingDescription}
    </div>
  );



}

export default SetStars
