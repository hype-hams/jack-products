/* eslint-disable max-len */
import React from 'react';
import axios from 'axios';

const { useState, useEffect } = React;

function Answers({ answers, answersAll }) {
  // QUICK THOUGHT: RENDER TWO ANSWERS TO START, THEN
  // WHEN DIV IS CLICKED ON SET STATE TO CLICKED AND RENDER ONLY THAT QUESITON
  // AND ALL ANSWERS

  // Finishing component thought; small detail is show answers should not render if 2 or less answers

  const handleAUpvote = (answerId) => {
    axios.put(`/api/q_a/answer/${answerId}/upvote`, {
      answer_id: answerId,
    })
      .then(() => {
        console.log('ANSWER ', answerId, 'HAS BEEN UPOVOTED');
      })
      .catch((err) => {
        console.error('ERROR UPVOTING ANSWER AT ID: ', answerId, '  ', err);
      });
  };

  const handleReport = (answerId) => {
    axios.put(`/api/q_a/answer/${answerId}/report`, {
      answer_id: answerId,
    })
      .then(() => {
        console.log('REPORT FOR ANSWER ', answerId, ' SUBMITTED');
      })
      .catch((err) => {
        console.error('ERROR REPORTING ANSWER AT ID: ', answerId, '  ', err);
      });
  };

  let answerArr = Object.entries(answers)
    .map((item) => ({
      answerer_name: item[1].answerer_name, id: item[1].id, body: item[1].body, helpfulness: item[1].helpfulness,
    }));
  if (!answersAll) {
    answerArr = answerArr.slice(0, 2);
  }
  return (
    <div>
      { answerArr.map((item) => (
        <div key={item.id}>
          <span className="answerer">
            {item.answerer_name}
          &#10;
            <p className="answerBody">
              A:
              &emsp;
              {item.body}
            </p>
            <span className="date" />
            <span className="answer-helpfulness">
              Helpful?
              &emsp;
              <button
                className="Upvote"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleAUpvote(item.id);
                }}
              >
                Yes :
                &emsp;
                {item.helpfulness}
              </button>
            </span>
            <button
              type="button"
              className="report"
              onClick={(e) => {
                e.preventDefault();
                handleReport(item.id);
              }}
            >
              Report

            </button>
          </span>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Answers;
