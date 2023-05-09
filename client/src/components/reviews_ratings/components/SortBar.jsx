import React, {useEffect, useState} from 'react';
import axios from 'axios';

const SortBar = ({dropSort, setDropSort}) => {

  //helpful = yes-no descending
  //newest = date
  //relevant = date + helpful with date being more important  DEFAULT
  // useEffect(() => {
  //   setReviewList(reviewList)
  // }, [])
  return (
    <div>
     <select
      onChange={(e) => {
        e.preventDefault()
        const selection = e.target.value
        console.log(selection)
        setDropSort(selection)
      }}>
        <option value="relevant">Relevant</option>
        <option value="helpful">Helpful</option>
        <option value="newest">Newest</option>
      </select>
    </div>
  )


}

export default SortBar;