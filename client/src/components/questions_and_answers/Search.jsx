import React from 'react';

const search = ({ setQuestions, questions }) => {
  const storage = questions;
  const filterResults = (text) => {
    // As soon as entry hits 3 chars, Begin filtering the List of questions
    // To include on relevant questions
    if (text.length > 3) {
      questions
    }
  };
  return (
    <form>
      <input
        placeholder="Search for keywords..."
        onChange={(event) => {
          event.preventDefault();
          filterResults(event.target);
        }}
      />
    </form>
  );
};

export default search;
