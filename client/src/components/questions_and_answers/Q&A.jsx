// main file for component, feel free to rename it or delete as you see fit..
// Also, feel free to add as many .jsx files in this folder
import React from 'react';
import Search from './Search.jsx';
import QuestionBody from './QuestionBody.jsx';
import Modal from './Modal.jsx';

const { useState, useEffect } = React;

function QA({ productID }) {
  let topTwo = [];

  const [filter, setFilter] = useState('');
  const [questions, setQuestions] = useState([]);
  const [questionsAll, setQuestionsAll] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [answers, setAnswers] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState([]);

  console.log('filter', filter);


  const qCheck = async (data) => {
    // If the questions list is empty, collapse it
    // Otherwise render 4 questions as default
    console.log('data:', questions);
    if (data.length === 0) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  };

  const getQuestionsByProductID = async (filter) => {
    // Retrieve questions from productID
    if (filter !== '') {
      setQuestions(filter);
    } else {
      try {
        const questionsResponse = await fetch(`/api/q_a/getQuestions?product_id=${productID}`);
        const parsedQuestions = await questionsResponse.json();
        console.log('parsed Data:  ', parsedQuestions);
        setQuestions(parsedQuestions.results);
        topTwo = [questions[0], questions[1]];
        qCheck(parsedQuestions.results);

        // Set Answers
        setAnswers(parsedQuestions.results[0].answers);
        console.log('Answers:  ', parsedQuestions.results[0].answers);
      } catch (err) {
        console.error('ERROR FETCHING QUESTIONS: ', err);
      }

    }
  };

  useEffect(() => {
    getQuestionsByProductID(filter);
    qCheck(questions);
  }, [filter]);


  return (
    <div data-testid="qa-1">
      <h1>Questions and answers</h1>
      <Search questions={questions} setQuestions={setQuestions} filter={filter} setFilter={setFilter} />
      {
        collapsed ? (
          <div>
            No Questions
            <div>
              <button
                type="button"
                className="Question-button"
                onClick={() => {
                  setModalType('Question', null);
                  setIsOpen(true);
                  document.querySelector('body').style.overflow = 'hidden';
                }}
              >
                Submit a Question

              </button>
              {modalIsOpen && <Modal closeModal={setIsOpen} modalType={modalType} product_id={productID} />}
            </div>
          </div>
        ) : (
          <div>
            <button
              type="button"
              className="Question-button"
              onClick={() => {
                setModalType(['Question', null]);
                setIsOpen(true);
                document.querySelector('body').style.overflow = 'hidden';
              }}
            >
              Submit a Question
            </button>
            {modalIsOpen && <Modal closeModal={setIsOpen} modalType={modalType} product_id={productID} />}
            <ol>
              {
                questionsAll ? (
                  questions.map((item) => <QuestionBody question={item} key={item.question_id} answers={answers} modalType={modalType} setModalType={setModalType} modalIsOpen={setIsOpen} />)
                ) : (
                  topTwo.map((item) => <QuestionBody question={item} key={item.question_id} answers={answers} modalType={modalType} setModalType={setModalType} modalIsOpen={setIsOpen} />)
                )
              }
              {questions.map((item) => <QuestionBody question={item} key={item.question_id} answers={answers} modalType={modalType} setModalType={setModalType} modalIsOpen={setIsOpen} />)}
            </ol>
          </div>
        )
      }
    </div>
  );
}

export default QA;
