
require("dotenv").config();
const axios = require('axios');

// test id 40344
const headAuth = {Authorization: process.env.API_KEY};
const serverAPI = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews`;

module.exports = {
  getReviews: (req, res) => { //needs product id
    // console.log('url test', serverAPI + `?product_id=${req.query.product_id}&count=${req.query.count}`)
    const queryParams = req.query.product_id
    const options = {
      method: 'get',
      url: serverAPI + `?product_id=${queryParams}&count=${req.query.count}`,
      headers: headAuth
    };
    return axios(options)
      .then((response) => {
        console.log('is this working', response.data)
        res.status(200).send(response.data)
      })
      .catch((err) => {
        res.status(500).send(err)
      })
  },
  postReview: (req, res) => {
    // console.log('server api', serverAPI)
    console.log('this is post req', req.body)
    // console.log('this is params', req.params)
    axios.post(serverAPI, req.body, {
      headers: headAuth
    })
      .then((response) => {
        res.status(201).send(response.data)
      })
      .catch((err) => {
        res.status(500).send(`unable to post: ${err}`)
      })
  },
  putHelpful: (req, res) => {
    console.log('this is req.body', req.body)
    console.log('this is req params', req.params)
    //req.body = product id / review id
    //req.params.id
    //results[i].review_id = xxx
      //results[i].review_id helpfulness
    axios.put(serverAPI + `/${req.query.review_id}/helpful`, {
      headers: headAuth
    })
    .then((response) => {
      res.status(204).send('incremented helpfulness')

    })
    .catch((err) => [
      res.status(500).send(`failed patch. this is body${req.body}, this is params ${req.params}`)
    ])
  },
  reportReview: (req, res) => {
    axios.put(serverAPI + `/${req.query.review_id}/report`, {
      headers: headAuth
    })
    .then((response) => {
      res.status(204).send(response.data)
    })
    .catch((err) => {
      res.status(500).send(err)
    })
  },
  getProductBreakdown: (req, res) => {
    axios.get(serverAPI + `/meta?${req.query.product_id}`, {
      headers:headAuth
    })
    .then((response) => {
      res.status(202).send(response.data)
    })
    .catch((err) => {
      res.status(500).send(err)
    })
  }
};


