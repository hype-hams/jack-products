require('dotenv').config();
const axios = require('axios');

// test id 40344
const headAuth = { Authorization: process.env.API_KEY };
const serverAPI = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews';

module.exports = {
  getReviews: (req, res) => { // needs product id
    const options = {
      method: 'GET',
      url: serverAPI,
      headers: headAuth,
      params: {
        page: req.query.page,
        count: req.query.count,
        sort: req.query.sort,
        product_id: req.query.product_id,
      },
    };
    return axios(options)
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  getProductBreakdown: (req, res) => {
    const options = {
      method: 'GET',
      url: `${serverAPI}/meta`,
      headers: headAuth,
      params: {
        product_id: req.query.product_id,
      },
    };
    return axios(options)
      .then((response) => {
        res.status(202).send(response.data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  postReview: (req, res) => {
    axios.post(serverAPI, req.body, {
      headers: headAuth,
    })
      .then((response) => {
        res.status(201).send(response.data);
      })
      .catch((err) => {
        res.status(500).send(`unable to post: ${err}`);
      });
  },
  putHelpful: (req, res) => {
    axios.put(`${serverAPI}/${req.body.review_id}/helpful`, req.body, {
      headers: headAuth,
    })
      .then((response) => {
        res.status(204).send(response.data);
      })
      .catch((err) => [
        res.status(500).send(err),
      ]);
  },
  reportReview: (req, res) => {
    axios.put(`${serverAPI}/${req.body.review_id}/report`, req.body, {
      headers: headAuth,
    })
      .then((response) => {
        res.status(204).send(response.data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

};
