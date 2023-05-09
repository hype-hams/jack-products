
require("dotenv").config();
const axios = require('axios');

// test id 40344
const headAuth = {Authorization: process.env.API_KEY};
const serverAPIQ = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions`;

module.exports = {

  getQuestions: (req, res) => {
    // Will get all Questions in the database
    // *** THIS WILL EITHER INCLUDE THE ANSWERS OR INCLUDE AN ID FOR THE ANSWERS ***
    const params = req.query.product_id
    const options = {
      method: 'get',
      url: serverAPIQ + `?product_id=${params}/answers`,
      headers: headAuth
    };
   return axios(options)
    .then((response) => {
      // console.log('AXIOS GET QUESTIONS SUCCESS:  ', response.data)
      res.status(200).send(response.data);
    })
    .catch((err) => {
      console.error('ERROR GETTING QUESTIONS:  ', err);
    })
  },

  getAllAnswers: (req, res) => {
    // I getQuestions returns an id, this will return the answers based off id
      // Otherwise this is redundant
    const params = req.query.question_id
    const options = {
      method: 'get',
      url: serverAPIQ + `/${params}/answers`,
      headers: headAuth
    };
    return axios(options)
    .then((response) => {
      res.status(200).send(response.data)
    })
    .catch((err) => {
      console.error('ERROR GETTING ANSWERS:  ',err)
    })
  },

  postQuestion: (req, res) => {
    // Will post a new question to the db
      // req will vary based off how modal looks
  },

  postAnswer: (req, res) => {
        // Will post a new Answer to the question
      // req will vary based off how modal looks
  }

}