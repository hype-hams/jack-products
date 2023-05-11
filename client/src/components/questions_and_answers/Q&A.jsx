// main file for component, feel free to rename it or delete as you see fit..
// Also, feel free to add as many .jsx files in this folder
import React from 'react';
import Search from './Search.jsx';
import QuestionBody from './QuestionBody.jsx';
import Modal from './Modal.jsx';

const { useState, useEffect } = React;

function QA({ productID }) {
  let topTwo = [];
  const [questions, setQuestions] = useState([]);
  const [questionsAll, setQuestionsAll] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [answers, setAnswers] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);


  const getQuestionsByProductID = async () => {
    // Retrieve questions from productID
    try {
      const questionsResponse = await fetch(`/api/q_a/getQuestions?product_id=${productID}`);
      const parsedQuestions = await questionsResponse.json();
      console.log('parsed Data:  ', parsedQuestions);
      qCheck([parsedQuestions]);
      setQuestions(parsedQuestions.results);
      topTwo = [questions[0], questions[1]];

      // Set Answers
      setAnswers(parsedQuestions.results[0].answers);
      console.log('Answers:  ', parsedQuestions.results[0].answers);
    } catch (err) {
      console.error('ERROR FETCHING QUESTIONS: ', err);
    }
  };

  const qCheck = async (data) => {
    // If the questions list is empty, collapse it
    // Otherwise render 4 questions as default
    if (data.length === 0) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  };

  useEffect(() => {
    getQuestionsByProductID();
  }, []);

  return (
    <div>
      {
        collapsed ? (
          <div>
            No Questions
            <div>
              <button
                type="button"
                className="Question-button"
                onClick={() => {
                  setIsOpen(!modalIsOpen);
                }}
              >
                Submit a Question

              </button>
              {modalIsOpen && <Modal closeModal={setIsOpen} />}
            </div>
          </div>
        ) : (
          <div>
            <Search questions={questions} setQuestions={setQuestions} />
            <button
              type="button"
              className="Question-button"
              onClick={() => {
                setIsOpen(!modalIsOpen);
              }}
            >
              Submit a Question
            </button>
            {modalIsOpen && <Modal closeModal={setIsOpen} />}
            <ol>
              {
                questionsAll ? (
                  questions.map((item) => <QuestionBody question={item} answers={answers} />)
                ) : (
                  topTwo.map((item) => <QuestionBody question={item} answers={answers} />)
                )
              }
              {questions.map((item) => <QuestionBody question={item} answers={answers} />)}
            </ol>
          </div>
        )
      }
    </div>
  );
}

export default QA;
