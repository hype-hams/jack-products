import React from 'react';

const { useState, useEffect } = React;


const search = ({ questions, filter, setFilter, setFilteredList, filteredList, getQuestionsByProductID }) => {

  const [searchInput, setSearchInput] = useState('');

  const handleChange = () => {
    // As soon as entry hits 3 chars, Begin filtering the List of questions
    // To include on relevant questions
    if (searchInput.length > 2) {
      setFilter(searchInput);
      setFilteredList(questions.filter((question) => question.question_body.match(searchInput)));
    } else if (searchInput === '') {
      setFilter('');
      setFilteredList(questions);
    }
  };
  useEffect(() => {

  }, [filteredList]);

  return (
    <form className="qa-searchform">
      <input
        className="qa-search"
        type="text"
        placeholder="Search for keywords..."
        value={searchInput}
        onChange={(event) => {
          event.preventDefault();
          setSearchInput(event.target.value);
          handleChange();
        }}
      />
    </form>
  );
};

export default search;
