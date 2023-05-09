// main file for component, feel free to rename it or delete as you see fit..
// Also, feel free to add as many .jsx files in this folder
import React from 'react';
import Search from './Search';
import QuestionBody from './QuestionBody';

const { useState, useEffect } = React;

function QA(productID) {
  const [questions, setQuestions] = useState({});
  const [collapsed, setCollapsed] = useState(false);

  const getQuestions = async () => {
    // Retrieve questions from productID
    try {
      const data = await fetch(`/q_a/getQuestions?product_id=${productID}`);
      setQuestions(data);
    } catch (err) {
      console.error('ERROR FETCHING QUESTIONS: ', err);
    }
  };

  const qCheck = () => {
    // If the questions list is empty, collapse it
    // Otherwise render 4 questions as default
    if (questions.length === 0) {
      setCollapsed(true);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div>
      {
        collapsed ? (
          <div>No Questions Posted</div>
        ) : (
          <div>
            <Search />
            <ol>
              {questions.map((item) => <QuestionBody question={item} />)}
            </ol>
          </div>
        )
      }
    </div>
  );
}

export default QA;
