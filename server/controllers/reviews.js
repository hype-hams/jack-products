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
        let sortTerm = req.query.sort
        if(sortTerm === undefined) {
           response.data.results
        } else if(sortTerm === 'newest') {
           response.data.results.sort((a, b)=> {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          })
        } else if (sortTerm === 'helpful') {
           response.data.results.sort((a, b) => {
            return a.helpfulness > b.helpfulness
          })
        } else if (sortTerm === 'relevant') {
          response.data.results.sort((a, b) => {
            // dynamic sort based on days since post * helpful
            return ((500/(new Date(b.date).getTime()*86400000))*b.helpfulness) - ((500/(new Date(a.date).getTime()*86400000))*a.helpfulness)
          })
        }
        res.status(200).send(response.data.results)
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
        res.status(200).send(response.data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  postReview: (req, res) => {
    // const options = {
    //   method: 'POST',
    //   url: serverAPI,
    //   headers: headAuth,
    //   params: {
    //     product_id: req.body.product_id,
    //     rating: req.body.rating,
    //     summary: req.body.summary,
    //     body: req.body.body,
    //     recommend: req.body.recommend,
    //     name: req.body.name,
    //     email: req.body.email,
    //     photos: req.body.photos,
    //     characteristics: req.body.characteristics
    //   }
    // }
    axios.post(serverAPI, req.body, {
      headers: headAuth,
    })
    return axios(options)
      .then((response) => {
        res.status(201);
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
