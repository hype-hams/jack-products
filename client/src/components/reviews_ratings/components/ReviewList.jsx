import React from 'react';
// import testData from '../testdata/reviewdata.json';
import ReviewTile from './ReviewTile.jsx';
const ReviewList = ({masterList, setMasterList}) => {

  // const params = {
  //   stars: 5 fill
  //   review date: new date
  //   summary: 60char
  //   body:250 char, button to show up to 1000
  //   images: 5 thumbs
  //   username:
  //   email: verified purchaser
  //   reccomend: button
  //   seller response if any
  //   helpful: two buttons
  // }

    let alteredList = masterList
                        .map((revObj, ind) => <ReviewTile
                                                revObj={revObj}
                                                key={ind}
                                                />)

  return (
    <div>
        <h3>Sort Button</h3>
        {
          alteredList.length !== 0 ? alteredList
          : <p>no reviews found</p>
        }
    </div>
  );
}
export default ReviewList;
