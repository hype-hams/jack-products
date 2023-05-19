/* eslint-disable max-len */
import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const { useState } = React;
// answers, answersAll
function Answers({question, answersAll, getQuestionsByProductID}) {
  // QUICK THOUGHT: RENDER TWO ANSWERS TO START, THEN
  // WHEN DIV IS CLICKED ON SET STATE TO CLICKED AND RENDER ONLY THAT QUESITON
  // AND ALL ANSWERS

  // Finishing component thought; small detail is show answers should not render if 2 or less answers

  const [answers, setAnswers] = useState(question.answers);
  const [isDisabled, setIsDisabled] = useState(false);
  const mouseOver = e => {
    e.target.style.height = '1.2em'
  };

  const mouseExit = e => {
    e.target.style.height = '1em'
  }

  const dateHandle = (d) => {
    return new Date(d)
      .toLocaleDateString('en-US',
        {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
  }

  const handleAUpvote = (answerId) => {
    axios.put(`/api/q_a/answer/${answerId}/upvote`, {
      answer_id: answerId,
    })
      .then(() => {
        getQuestionsByProductID();
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
        setAnswers(oldA => {
          return oldA.filter(currAns => currAns.answer_id !== answer.answer_id)
        })
      })
      .catch((err) => {
        console.error('ERROR REPORTING ANSWER AT ID: ', answerId, '  ', err);
      });
  };

  let answerArr = Object.entries(answers)
    .map((item) => ({
      answerer_name: item[1].answerer_name, id: item[1].id, body: item[1].body, helpfulness: item[1].helpfulness, date: item[1].date,
    }));
  if (!answersAll) {
    answerArr = answerArr.slice(0, 2);
  }
  return (
    <div className="answer-innerbody">
      { answerArr.map((item) => (
        <div key={item.id} className="answer-individual">
          <span className="answerer"  id="italics">
            {item.answerer_name}
            <span className="QAdate">{dateHandle(item.date)}</span>
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
                disabled={isDisabled}
                onClick={(e) => {
                  setIsDisabled(true);
                  e.preventDefault();
                  handleAUpvote(item.id);
                }}
              >
                <FontAwesomeIcon icon={faArrowUp} style={{color: "#e73636",}} onMouseOver={mouseOver} onMouseLeave={mouseExit}/>
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
        </div>
      ))}
    </div>
  );
}

export default Answers;
