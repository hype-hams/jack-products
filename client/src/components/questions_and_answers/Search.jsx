import React from 'react';

const search = () => {
  const filterResults = () => {
    // As soon as entry hits 3 chars, Begin filtering the List of questions
    // To include on relevant questions
  };
  return (
    <form>
      <input
        placeholder="Have a question? Search for answers..."
        onChange={(event) => {
          event.preventDefault();
          filterResults();
        }}
      />
    </form>
  );
};

export default search;
