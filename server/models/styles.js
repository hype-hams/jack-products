const pool = require('../database');

module.exports = {
  async getAll({ product_id }, callback) {
    // connect the client
    // pool.query handles checkout of connection and termination
    const queryStr = `SELECT style.product_id, json_agg(json_build_object(
      'style_id', style.id,
      'name', style.name,
      'original_price', style.original_price,
      'sale_price', style.sale_price,
      'default?', style.default_style
    )) AS results
    FROM style
    WHERE style.product_id = 4
    GROUP BY style.product_id`;
    await pool.query(queryStr, (err, { rows }) => {
      if (err) {
        callback(err);
      } else {
        callback(null, rows[0]);
      }
    });
  },
};
