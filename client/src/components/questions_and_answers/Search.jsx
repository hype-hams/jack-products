import React from 'react';

const { useState, useEffect } = React;


const search = ({ questions, filter, setFilter }) => {

  const [searchInput, setSearchInput] = useState('');
  const [filteredList, setFilteredList] = useState('');

  const handleChange = () => {
    // As soon as entry hits 3 chars, Begin filtering the List of questions
    // To include on relevant questions
    if (searchInput.length > 2) {
      setFilter(questions.filter((question) => question.question_body.match(searchInput)));
    }
  };

  useEffect(() => {
  }, [filter]);

  return (
    <form>
      <input
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
