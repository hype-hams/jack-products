require('dotenv').config();
const axios = require('axios');

// test id 40344
const headAuth = { Authorization: process.env.API_KEY };
const serverAPI = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions';

module.exports = {

  getQuestions: (req, res) => {
    // Will get all Questions in the database
    // *** THIS WILL EITHER INCLUDE THE ANSWERS OR INCLUDE AN ID FOR THE ANSWERS ***
    const params = req.query.product_id;
    const options = {
      method: 'get',
      url: `${serverAPI}?product_id=${params}`,
      headers: headAuth,
    };
    return axios(options)
      .then((response) => {
        // console.log('AXIOS GET QUESTIONS SUCCESS:  ', response.data)
        res.status(200).send(response.data);
      })
      .catch((err) => {
        console.error('ERROR GETTING QUESTIONS:  ', err);
      });
  },

  getAllAnswers: (req, res) => {
    // I getQuestions returns an id, this will return the answers based off id
    // Otherwise this is redundant
    const params = req.query.question_id;
    const options = {
      method: 'get',
      url: `${serverAPI}/${params}/answers`,
      headers: headAuth,
    };
    return axios(options)
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        console.error('ERROR GETTING ANSWERS:  ', err);
      });
  },

  postQuestion: (req, res) => {
    // Will post a new question to the db
    // req will vary based off how modal looks
    axios.post(serverAPI, req.body, {
      headers: headAuth,
      params: {
        product_id: req.product_id,
      },
    })
      .then((response) => {
        res.status(201).send(response.data);
      })
      .catch((err) => {
        console.error('PROBLEM WITH POSTING QUESTION: ', err);
      });
  },

  postAnswer: (req, res) => {
    // Will post a new Answer to the question
    // req will vary based off how modal looks
    console.log('query: ', req.body);
    axios.post(`${serverAPI}/${req.body.question_id}/answers`, req.body, {
      headers: headAuth,
      params: {
        question_id: req.question_id,
      },
    })
      .then((response) => {
        res.status(201).send(response.data);
      })
      .catch((err) => {
        console.error('PROBLEM WITH POSTING ANSWER: ', err);
      });
  },

  upvoteQuestion: (req, res) => {
    axios.put(`${serverAPI}/${req.body.question_id}/helpful`, req.body, {
      headers: headAuth,
      params: {
        product_id: req.body.product_id,
      },
    })
      .then((response) => {
        res.status(204).send(response.data);
      })
      .catch((err) => {
        console.error('PROBLEM UPVOTING QUESTION:  ', err);
      });
  },

  reportQuestion: (req, res) => {
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${req.body.question_id}/report`, req.body, {
      headers: headAuth,
      params: {
        question_id: req.body.question_id,
      },
    })
      .then((response) => {
        res.status(204).send(response.data);
      })
      .catch((err) => {
        console.error('PROBLEM REPORTING QUESTION:  ', err);
      });
  },
  // Can optimize the two functions below, by combining them and swapping the final endpoint with a passable tag
  // So it can just read the require task and run from there

  upvoteAnswer: (req, res) => {
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${req.body.answer_id}/helpful`, req.body, {
      headers: headAuth,
      params: {
        answer_id: req.body.answer_id,
      },
    })
      .then((response) => {
        res.status(204).send(response.data);
      })
      .catch((err) => {
        console.error('PROBLEM UPVOTING QUESTION:  ', err);
      });
  },

  reportAnswer: (req, res) => {
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${req.body.answer_id}/report`, req.body, {
      headers: headAuth,
      params: {
        answer_id: req.body.answer_id,
      },
    })
      .then((response) => {
        res.status(204).send(response.data);
      })
      .catch((err) => {
        console.error('PROBLEM REPORTING ANSWER:  ', err);
      });
  },
};
