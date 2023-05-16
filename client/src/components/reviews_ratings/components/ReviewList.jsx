import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ReviewTile from './ReviewTile.jsx';


const ReviewList = ({productId, setReviewList, ratingFilter, reviewList, dropSort}) => {
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
          count: 1000,
          page: page
        }
      })
      setReviewList((prevList) => [...prevList, ...response.data])
      setPage((prevPage) => prevPage + 1)
    } catch(error) {
      console.log('there was an error', error)
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= 2300 || isLoading) {
      // console.log(document.documentElement.offsetHeight)
      return;
    }
    getReviews();
  };
  const starFilter = () => {
    let result = []
    for(let key in ratingFilter) {
      if (ratingFilter[key] === true) {
        result.push(Number(key))
      }
    }
    return result
  }


  useEffect(() => {
    // console.log(dropSort)
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  useEffect(() => {
    getReviews()
    console.log('this is new drop sort', dropSort)
  }, [dropSort])


  let alteredList = reviewList
    .filter((tile) => {
      if (starFilter().length > 0) {
        return starFilter().includes(tile.rating) === true
        // return
      }
      return true
    })
    .map((revObj, ind) =>
      <ReviewTile
      productId={productId}
        setReviewList={setReviewList}
        revObj={revObj}
        key={ind}/>)

  return (
    <div>
        <div className="infinite-reviews">
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
