import React from 'react';

const Email = ({setEmail}) => {

  return (
    <section className="email">
      <label>Email:
      <sup>*</sup>
      </label>
        <input name="email"
          aria-label="email"
          aria-selected="true"
          type="email"
          placeholder="Example: jackson11@email.com"
          size="30"
          maxLength="60"
          onChange={(e)=>{setEmail(e.target.value)}}
        ></input><br></br>
        <small style={{color:'gray'}}>For authentication reasons. You will not be emailed.</small>
      </section>
  )
}

export default Email