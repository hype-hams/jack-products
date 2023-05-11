/* eslint-disable max-len */
import React from 'react';

// const { useState } = React;

function Answers({ answers, answersAll }) {
  // QUICK THOUGHT: RENDER TWO ANSWERS TO START, THEN
  // WHEN DIV IS CLICKED ON SET STATE TO CLICKED AND RENDER ONLY THAT QUESITON
  // AND ALL ANSWERS
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
              Helpfullness:
              &emsp;
              {item.helpfulness}
            </span>
            <button type="button" className="report">Report</button>
          </span>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Answers;
