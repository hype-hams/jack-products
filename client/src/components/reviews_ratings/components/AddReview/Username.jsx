import React from 'react';

const Username = ({setUsername}) => {

  return (
    <section className="username">
      <label>Username:<sup>*</sup></label>
        <input name="name"
        aria-label="username"
        aria-selected="true"
          type="text"
          placeholder="Example: jackson11!"
          size="30"
          maxLength="60"
          onChange={(e)=>{setUsername(e.target.value)}}
        ></input><br></br>
        <small style={{color:'gray'}}>For privacy reasons, do not use your full name or email address.</small>
      </section>
  )
}

export default Username