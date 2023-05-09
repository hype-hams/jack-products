import React from 'react';

const { useState } = React;

function Answers(question) {
  const [answers, setAnswers] = useState({});
  setAnswers(question.answers);

  const answerFormatter = () => {
    Object.keys(answers).forEach((key) => (
      <div>
        <span className="answerer">{answers[key].answerer_name}</span>
        <p className="answerBody">
          A:
          {answers[key].body}
        </p>
        <span className="date" />
        <int>{answers[key].helpfullness}</int>
      </div>
    ));
  };

  return (
    { answerFormatter }
  );
}

export default Answers;
