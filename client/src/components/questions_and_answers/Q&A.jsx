// main file for component, feel free to rename it or delete as you see fit..
// Also, feel free to add as many .jsx files in this folder
import React from 'react';
import Modal from 'react-modal';
import Search from './Search.jsx';
import QuestionBody from './QuestionBody.jsx';

const { useState, useEffect } = React;

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function QA({ productID }) {
  let subtitle;

  const [questions, setQuestions] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [answers, setAnswers] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalType, setType] = useState('');

  const getQuestionsByProductID = async () => {
    // Retrieve questions from productID
    try {
      const questionsResponse = await fetch(`/api/q_a/getQuestions?product_id=${productID}`);
      const parsedQuestions = await questionsResponse.json();
      console.log('parsed Data:  ', parsedQuestions);
      qCheck([parsedQuestions]);
      setQuestions(parsedQuestions.results);

      // Set Answers
      setAnswers(parsedQuestions.results[0].answers);
      console.log('Answers:  ', parsedQuestions.results[0].answers);
    } catch (err) {
      console.error('ERROR FETCHING QUESTIONS: ', err);
    }
  };

  const openQuestionModal = () => {
    setIsOpen(true);
  };

  const handleOpenQuestionModal = () => {
    subtitle.style.color = '#f00';
  };

  const closeQuestionModal = () => {
    setIsOpen(false);
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
              <button type="button" className="Question-button" onClick={openQuestionModal}>Submit a Question</button>
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={handleOpenQuestionModal}
                style={customStyles}
                onRequestClose={closeQuestionModal}
                contentLabel="Question Modal"
              >
                <h2>Hello</h2>
                <button type="button" onClick={closeQuestionModal}>Close</button>
                <div>I am a Modal</div>
                <form>
                  <input type="text" id="question-username" placeholder="username" autoComplete="off" />
                  <input type="text" id="question-email" placeholder="email" autoComplete="off" />
                  <input type="text" id="question-body" placeholder="Ask your question here!" autoComplete="off" />
                </form>
              </Modal>
            </div>
          </div>
        ) : (
          <div>
            <Search setQuestions={setQuestions} />
            <button type="button" className="Question-button" onClick={openQuestionModal}>Submit a Question</button>
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={handleOpenQuestionModal}
              style={customStyles}
              onRequestClose={closeQuestionModal}
              contentLabel="Question Modal"
            >
              <h2>Submit a Questions</h2>
              <button type="button" onClick={closeQuestionModal}>Close</button>
              <div>I am a Modal</div>
              <form>
                <input type="text" id="question-username" placeholder="username" autoComplete="off" />
                <input type="text" id="question-email" placeholder="email" autoComplete="off" />
                <input type="text" id="question-body" placeholder="Ask your question here!" autoComplete="off" />
              </form>
            </Modal>
            <ol>
              {questions.map((item) => <QuestionBody question={item} answers={answers} />)}
            </ol>
          </div>
        )
      }
    </div>
  );
}

export default QA;
