import React, {useState, useEffect} from 'react';
import axios from 'axios';
// import testData from '../testdata/reviewdata.json';
import ReviewTile from './ReviewTile.jsx';

const ReviewList = ({productId, dropSort}) => {
  const [reviewList, setReviewList] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const getReviews = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get('/api/reviews', {
        params: {
          product_id: productId,
          sort: dropSort,
          count: 4,
          page: page
        }
      })
      console.log('this is data', response.data)
      setReviewList((prevList) => [...prevList, ...response.data])
      setPage((prevPage) => prevPage + 1)
    } catch(err) {
      console.log('there was an error', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
      return;
    }
    getReviews();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);


  let alteredList = reviewList.map((revObj, ind) =>
    <ReviewTile
      setReviewList={setReviewList}
      revObj={revObj}
      key={ind}
      />)
  return (
    <div>
        <div>
        {
          alteredList.length !== 0 ? alteredList
          : <p>no reviews found</p>
        }
        </div>
        <section>
          {isLoading && <p>Loading...</p>}
        </section>
    </div>
  );
}
export default ReviewList;
