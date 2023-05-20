import React from 'react';

function RecommendProduct({ setRecommend }) {
  return (
    <section
      className="recommend"
      id="modal-recommend"
    >
      <p>
        Do you recommend this product?
        <sup>*</sup>
        <input
          type="radio"
          value
          name="recommend"
          defaultChecked
          onClick={() => setRecommend(true)}
        />
        <span>Yes</span>
        <input
          type="radio"
          value={false}
          name="recommend"
          onClick={() => setRecommend(false)}
        />
        <span>No</span>
      </p>
    </section>
  );
}

export default RecommendProduct;
