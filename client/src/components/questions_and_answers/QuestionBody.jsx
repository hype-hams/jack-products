/* eslint-disable no-trailing-spaces */
import React from 'react';
import axios from 'axios';
import Answers from './Answers.jsx';

const { useState } = React;

// Maybe use div here to render it as multiple variables rather than a list
// Here we return the basic Structure of the individual questions
/*
    -A text line reading the Question read as Q: blah blah blah?
    - Either coded here or mounted from a future Questions.jsx

    -Following this, a button reading "write an answer",
      - On click, this button will open the Add answer modal

    -After this on a new line, the answers will be listed in this order:
      - Seller(bold) -> highest rated(descending) up to 2 questions
      - These will be either taken in this file or in a future Answers.jsx

    - At the bottom there will be a button reading "See more Answers"
      - On click, this button will expand the list up untill the screen is filled
      - Then the window will be scrollable
      -The button will then be replaced by a collapse button that will revert changes

  */
// const { useState } = React;

function QuestionBody({
  question, answers, modalType, setModalType, modalIsOpen,
}) {
  const [answersAll, setAnswersAll] = useState(false);

  const handleQUpvote = () => {
    axios.put('/api/q_a/question/upvote', {
      question_id: question.question_id,
    });
  };

  const handleQReport = () => {
    axios.put(`/api/q_a/question/${question.question_id}/report`, {
      question_id: question.question_id,
    })
      .then(() => {
        console.log('QUESTION ', question.question_id, 'HAS BEEN REPORTED');
      })
      .catch((err) => {
        console.error('ERROR REPORTING QUESTION AT ID: ', question.question_id, '  ', err);
      });
  };

  return (
    <div className="question" key={question.question_id}>
      <span className="asker_ name">{question.asker_name}</span>
      <p className="question_body">
        Q:
        {' '}
        {question.question_body}
      </p>
      Helpful?
      &emsp;
      <button
        className="Upvote"
        type="button"
        onClick={(event) => {
          event.preventDefault();
          handleQUpvote();
        }}
      >
        Yes :
        &emsp;
        {question.question_helpfulness}
      </button>
      <button
        type="button"
        className="report"
        onClick={(e) => {
          e.preventDefault();
          handleQReport();
        }}
      >
        Report

      </button>
      <button
        type="button"
        className="reply"
        onClick={() => {
          setModalType(['Reply', question]);
          modalIsOpen(true);
        }}
      >
        Reply
      </button>

      <hr />

      <Answers answers={answers} answersAll={answersAll} />

      <button
        type="button"
        className="moreAnswers"
        onClick={(event) => {
          if (!answersAll) {
            event.target.innerHTML = 'Show less Answers';
          } else {
            event.target.innerHTML = 'Show more Answers';
          }
          setAnswersAll(!answersAll);
        }}
      >
        Show more Answers
      </button>
    </div>
  );
}
export default QuestionBody;
