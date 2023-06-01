/* eslint-disable camelcase */
require('dotenv').config();
const axios = require('axios');
const models = require('../models');

module.exports = {
  // Retrieves the list of products, defalut page = 1, defalut count = 5

  getProduct: async (req, res) => {
    await models.products.getAll(req.query, (err, data) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).send(data);
      }
    });
  },

  // Returns all product level information for a specified product id
  getProductById: async (req, res) => {
    const { product_id } = req.params;
    await models.products.getOne(req.params, (err, data) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).send(data);
      }
    });
  },

  // Returns all styles available for the given product
  getStyles: async (req, res) => {
    await models.styles.getAll(req.params, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  },

  // // Returns the id's of products related to the product specified
  getRelated: async (req, res) => {
    await models.related.getAll(req.params, (err, data) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).send(data);
      }
    });
  },

  // // Adds a product to the cart.  Example: req.body => { sku_id: 1394769 }
  // addCart: (req, res) => {
  //   axios.post(`${url}/cart`, req.body, {
  //     headers: {
  //       Authorization: `${process.env.API_KEY}`,
  //     },
  //   })
  //     .then((response) => {
  //       res.status(201).send(response.data);
  //     })
  //     .catch((err) => {
  //       console.log('Err occurs in product_detail addCart: ', err);
  //       res.status(500).send(err.message);
  //     });
  // },

  // // Retrieves list of products added to the cart by a user.
  // // Example: response.data => [ { "sku_id": 1394769, "count": "4" } ]
  // getCart: (req, res) => {
  //   axios.get(`${url}/cart`, {
  //     headers: {
  //       Authorization: `${process.env.API_KEY}`,
  //     },
  //   })
  //     .then((response) => {
  //       res.status(200).send(response.data);
  //     })
  //     .catch((err) => {
  //       console.log('Err occurs in product_detail getCart: ', err);
  //       res.status(500).send(err.message);
  //     });
  // },

  // // Adds a interaction to the db.
  // // req.body format: { "element": "xxx", "widget": "xxx", "time": "xxx" }
  // addInteraction: (req, res) => {
  //   axios.post(`${url}/interactions`, req.body, {
  //     headers: {
  //       Authorization: `${process.env.API_KEY}`,
  //     },
  //   })
  //     .then((response) => {
  //       res.status(201).send(response.data);
  //     })
  //     .catch((err) => {
  //       console.log('Err occurs in product_detail addInteraction: ', err);
  //       res.status(500).send(err.message);
  //     });
  // },
};
