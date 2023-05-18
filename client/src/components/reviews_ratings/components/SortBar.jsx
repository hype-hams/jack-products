import React from 'react';

const SortBar = ({setDropSort}) => {


  return (
    <section className="sortbar">
     <select id="sortbar"
      aria-label="sortbar"
      onChange={(e) => {
        e.preventDefault()
        const selection = e.target.value
        setDropSort(selection)
      }}>
        <option value="relevant">Relevant</option>
        <option value="helpful">Helpful</option>
        <option value="newest">Newest</option>
      </select>
    </section>
  )
};

export default SortBar;