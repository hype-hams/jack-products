/* eslint-disable no-trailing-spaces */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import axios from 'axios';
import Answers from './Answers.jsx';

const { useState, useEffect } = React;

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

function QuestionBody({
  question, answers, modalType, setModalType, modalIsOpen, getQuestionsByProductID,
}) {
  const [answersAll, setAnswersAll] = useState(false);

  const handleQUpvote = () => {
    axios.put('/api/q_a/question/upvote', {
      question_id: question.question_id,
    })
      .then(() => {
        getQuestionsByProductID();
      })
      .catch((err) => {
        console.error('ERROR IN RERENDER FOR UPVOTE: ', err);
      });
  };

  const mouseOver = (e) => {
    e.target.style.height = '1.2em';
  };

  const mouseExit = (e) => {
    e.target.style.height = '1em';
  };

  const handleQReport = () => {
    axios.put(`/api/q_a/question/${question.question_id}/report`, {
      question_id: question.question_id,
    })
      .then(() => {
        getQuestionsByProductID();
        console.log('QUESTION ', question.question_id, 'HAS BEEN REPORTED');
      })
      .catch((err) => {
        console.error('ERROR REPORTING QUESTION AT ID: ', question.question_id, '  ', err);
      });
  };

  return (
    <div className="question-innerbody">

      <div className="question" key={question.question_id}>
        <span className="asker-name" id="italics">{question.asker_name}</span>
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
          <FontAwesomeIcon icon={faArrowUp} style={{ color: 'blue' }} onMouseOver={mouseOver} onMouseLeave={mouseExit} />
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
      </div>

      <Answers
        question={question}
        answersAll={answersAll}
        getQuestionsByProductID={getQuestionsByProductID}
        onMouseEnter={mouseOver}
        onMouseLeave={mouseExit}
      />

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
