/* eslint-disable camelcase */
require('dotenv').config();
const axios = require('axios');

const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp';

module.exports = {
  // Retrieves the list of products, defalut page = 1, defalut count = 5
  getProduct: (req, res) => {
    axios.get(`${url}/products`, {
      headers: {
        Authorization: `${process.env.API_KEY}`,
      },
      params: {
        page: req.query.page,
        count: req.query.count,
      },
    })
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        console.log('Err occurs in product_detail getProduct: ', err);
        res.status(500).send(err.message);
      });
  },

  // Returns all product level information for a specified product id
  getProductById: (req, res) => {
    const { product_id } = req.params;
    axios.get(`${url}/products/${product_id}`, {
      headers: {
        Authorization: `${process.env.API_KEY}`,
      },
    })
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        console.log('Err occurs in product_detail getProductById: ', err);
        res.status(500).send(err.message);
      });
  },

  // Returns the all styles available for the given product
  getStyles: (req, res) => {
    const { product_id } = req.params;
    axios.get(`${url}/products/${product_id}/styles`, {
      headers: {
        Authorization: `${process.env.API_KEY}`,
      },
    })
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        console.log('Err occurs in product_detail getStyles: ', err);
        res.status(500).send(err.message);
      });
  },

  // Returns the id's of products related to the product specified
  getRelated: (req, res) => {
    const { product_id } = req.params;
    axios.get(`${url}/products/${product_id}/related`, {
      headers: {
        Authorization: `${process.env.API_KEY}`,
      },
    })
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        console.log('Err occurs in product_detail getRelated: ', err);
        res.status(500).send(err.message);
      });
  },

  // Adds a product to the cart.  Example: req.body => { sku_id: 1394769 }
  addCart: (req, res) => {
    axios.post(`${url}/cart`, req.body, {
      headers: {
        Authorization: `${process.env.API_KEY}`,
      },
    })
      .then((response) => {
        res.status(201).send(response.data);
      })
      .catch((err) => {
        console.log('Err occurs in product_detail addCart: ', err);
        res.status(500).send(err.message);
      });
  },

  // Retrieves list of products added to the cart by a user.
  // Example: response.data => [ { "sku_id": 1394769, "count": "4" } ]
  getCart: (req, res) => {
    axios.get(`${url}/cart`, {
      headers: {
        Authorization: `${process.env.API_KEY}`,
      },
    })
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        console.log('Err occurs in product_detail getCart: ', err);
        res.status(500).send(err.message);
      });
  },

  // Adds a interaction to the db.
  // req.body format: { "element": "xxx", "widget": "xxx", "time": "xxx" }
  addInteraction: (req, res) => {
    console.log('addInteraction body: ', req.body);
    axios.post(`${url}/interactions`, req.body, {
      headers: {
        Authorization: `${process.env.API_KEY}`,
      },
    })
      .then((response) => {
        res.status(201).send(response.data);
      })
      .catch((err) => {
        console.log('Err occurs in product_detail addInteraction: ', err);
        res.status(500).send(err.message);
      });
  },
};
