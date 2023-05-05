
require("dotenv").config();
const axios = require('axios');

// test id 40344
const headAuth = {Authorization: process.env.API_KEY};
const serverAPIQ = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions`;

module.exports = {

  getQuestions: (req, res) => {
    // Will get all Questions in the database

    // *** THIS WILL EITHER INCLUDE THE ANSWERS OR INCLUDE AN ID FOR THE ANSWERS ***

    axios.get(serverAPIQ, {

    })
  },

  getAllAnswers: (req, res) => {
    // I getQuestions returns an id, this will return the answers based off id
      // Otherwise this is redundant
  },

  postQuestion: (req, res) => {
    // Will post a new question to the db
      // req will vary based off how modal looks
  },

}