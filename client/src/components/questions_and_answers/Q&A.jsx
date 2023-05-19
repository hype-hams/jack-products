// main file for component, feel free to rename it or delete as you see fit..
// Also, feel free to add as many .jsx files in this folder
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Search from './Search.jsx';
import QuestionBody from './QuestionBody.jsx';
import Modal from './Modal.jsx';

const { useState, useEffect } = React;

function QA({ productID }) {
  const [filter, setFilter] = useState('');
  const [questions, setQuestions] = useState([]);
  const [questionsAll, setQuestionsAll] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [answers, setAnswers] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState([]);
  const [filteredList, setFilteredList] = useState('');

  console.log('filter', filter);

  const qCheck = async (data) => {
    // If the questions list is empty, collapse it
    // Otherwise render 4 questions as default
    console.log('qCheck:', data);
    if (data.length === 0) {
      console.log('collapsing');
      setCollapsed(true);
    } else {
      console.log('uncollapsing');
      setCollapsed(false);
    }
  };

  const getQuestionsByProductID = async () => {
    // Retrieve questions from productID
    if (filter.length !== 0) {
      console.log('filter: ', filter);
      setQuestions(filteredList);
    } else {
      setFilter('');
      try {
        console.log('testest');
        const questionsResponse = await fetch(`/api/q_a/getQuestions?product_id=${productID}`);
        const parsedQuestions = await questionsResponse.json();
        console.log('parsed Data:  ', parsedQuestions);
        setQuestions(parsedQuestions.results.sort((a, b) => parseFloat(b.score) - parseFloat(a.score)));
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
    getQuestionsByProductID();
    qCheck(questions);
  }, [filter]);

  return (
    <div data-testid="qa-1" className="Qa-header">
      <h1>Questions and Answers</h1>
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
              <Search
                questions={questions}
                setQuestions={setQuestions}
                filter={filter}
                setFilter={setFilter}
                setFilteredList={setFilteredList}
                getQuestionsByProductID={getQuestionsByProductID}
              />
              {modalIsOpen && (
              <Modal
                closeModal={setIsOpen}
                modalType={modalType}
                product_id={productID}
                setIsOpen={setIsOpen}
              />
              )}
            </div>
          </div>
        ) : (
          <div className="wholeQA">
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
            <Search
              questions={questions}
              setQuestions={setQuestions}
              filter={filter}
              setFilter={setFilter}
              setFilteredList={setFilteredList}
              getQuestionsByProductID={getQuestionsByProductID}
            />
            {modalIsOpen && (
            <Modal
              closeModal={setIsOpen}
              modalType={modalType}
              product_id={productID}
              setIsOpen={setIsOpen}
            />
            )}
            <ol className="questionslist">
              {
                questionsAll ? (
                  questions.map((item) => (
                    <QuestionBody
                      question={item}
                      setQuestions={setQuestions}
                      key={item.question_id}
                      answers={answers}
                      modalType={modalType}
                      setModalType={setModalType}
                      modalIsOpen={setIsOpen}
                      getQuestionsByProductID={getQuestionsByProductID}
                    />
                  ))
                ) : (
                  questions.slice(0, 2).map((item) => (
                    <QuestionBody
                      question={item}
                      setQuestions={setQuestions}
                      key={item.question_id}
                      answers={answers}
                      modalType={modalType}
                      setModalType={setModalType}
                      modalIsOpen={setIsOpen}
                      getQuestionsByProductID={getQuestionsByProductID}
                    />
                  ))
                )
              }
            </ol>
            {questions.length > 2 ? (
              <button
                type="button"
                className="moreQuestions"
                onClick={(event) => {
                  if (!questionsAll) {
                    event.target.innerHTML = 'Show less Questions';
                  } else {
                    event.target.innerHTML = 'Show more Questions';
                  }
                  setQuestionsAll(!questionsAll);
                }}
              >
                Show more Questions
              </button>
            )

              : null}
          </div>
        )
      }
    </div>
  );
}

export default QA;
