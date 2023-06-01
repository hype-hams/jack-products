const pool = require('../database');

module.exports = {
  async getAll({ product_id }, callback) {
    // connect the client
    // pool.query handles checkout of connection and termination
    const queryStr = `SELECT json_agg(DISTINCT related_id) AS related FROM related WHERE product_id = ${product_id}`;
    await pool.query(queryStr, (err, related) => {
      if (err) {
        callback(err);
      } else if (related) {
        callback(null, related.rows[0].related);
      }
    });
  },
};
