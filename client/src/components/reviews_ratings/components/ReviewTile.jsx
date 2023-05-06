import React from 'react';
import Stars from './Stars.jsx';

const ReviewTile = ({revObj}) => {

  // const verfiedBuyer = if(revObj.)

  return (
    <div>
      <form>
        <div>
          {revObj.rating}
        </div>
        <div>
          {revObj.reviewer_name}
          {revObj.date}
        </div>
        <div>
          <div>
            {revObj.summary}
          </div>
          <div>
            {revObj.body}
            <button>show more..</button>
          </div>
          <div>
            {/* <input
              type="radio"
              className="recommend"
              >{revObj.recommend}
            </input> */}
          </div>

        </div>
      </form>
    </div>
  )
}
export default ReviewTile;