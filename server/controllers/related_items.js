const axios = require('axios');
require('dotenv').config();

module.exports = {
  getRelatedProducts: (req, res) => {
    console.log('product_id', req.params.product_id);
    const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${req.params.product_id}/related`;
    const header = {
      headers: {
        'Authorization': `${process.env.API_KEY}`
      }
    };
    axios.get(url, header).then((data) => {
      res.status(200).json(data.data);
    }).catch((err) => {
      console.error('error', err);
      res.sendStatus(500);
    });
  }
};
