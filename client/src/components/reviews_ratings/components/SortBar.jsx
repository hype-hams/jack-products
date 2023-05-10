import React from 'react';

const SortBar = ({setDropSort}) => {
  return (
    <div className="sortbar">
     <select id="sortbar"
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
};

export default SortBar;