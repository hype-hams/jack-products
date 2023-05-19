import React from 'react';


const RecommendProduct = ({setRecommend}) => {

  return (
    <section className="recommend"
              id="modal-recommend">
      <p>Do you recommend this product?
        <sup>*</sup>
        <input
          type="radio"
          value={true}
          name="recommend"
          defaultChecked
          onClick={()=>setRecommend(true)}
        ></input>
          <span>Yes</span>
        <input
        type="radio"
        value={false}
        name="recommend"
        onClick={()=>setRecommend(false)}
      ></input>
        <span>No</span></p>
      </section>
  )

}


export default RecommendProduct;