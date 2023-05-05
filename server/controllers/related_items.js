const axios = require('axios');
require('dotenv').config();

module.exports = {
  retrieve: (req, res) => {
    const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${req.paramas.product_id}/related`;
    axios.get(
      url,
      {
        Authorization: `${process.env.API_KEY}`,
      },
    ).then((data) => {
      res.status(200).json(data);
    }).catch((err) => {
      console.error('error', err);
    });
  },
};
