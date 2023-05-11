import React, {useState} from 'react';
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const SetStars = () => {
  const [personalRating, setPersonalRating] = useState(0);
  const starsubmit = Array(5).fill(0)


  return (
    <div>
      <section>
        {
          starsubmit.map((iStar, ind) => {
            return (
              <FontAwesomeIcon icon={faStar}
                className="fa fa-star empty-star"
                key={ind}
                onClick={(e)=> {setPersonalRating(e.target.value)}}/>
            )
          })
        }
      </section>
    </div>
  )


}

export default SetStars