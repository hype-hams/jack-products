import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ReviewTile from './ReviewTile.jsx';


const ReviewList = ({productId, setReviewList, reviewList, dropSort}) => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)


  const getReviews = async () => {
    setError(null)
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
      setReviewList((prevList) => [...prevList, ...response.data])
      setPage((prevPage) => prevPage + 1)
    } catch(error) {
      console.log('there was an error', err)
      setError(error)
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
    // console.log(dropSort)
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  useEffect(() => {
    getReviews()
  }, [dropSort])


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
          {error && <p>Error: {error.message}</p>}
        </section>
    </div>
  );
}
export default ReviewList;
