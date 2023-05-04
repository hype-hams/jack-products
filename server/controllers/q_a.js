
module.exports = {

  getQuestions: (req, res) => {
    // Will get all Questions in the database

    // *** THIS WILL EITHER INCLUDE THE ANSWERS OR INCLUDE AN ID FOR THE ANSWERS ***
  },

  getAllAnswers: (req, res) => {
    // I getQuestions returns an id, this will return the answers based off id
      // Otherwise this is redundant
  },

  postQuestion: (req, res) => {
    // Will post a new question to the db
      // req will vary based off how modal looks
  },

  postAnswer: (req, res) => {
    // Will post a new answer to a specific question in the db
      // req will vary based off how modal looks
  }
};