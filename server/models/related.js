const pool = require('../database');

module.exports = {
  async getAll({ product_id }, callback) {
    // connect the client
    // pool.query handles checkout of connection and termination
    const queryStr = `SELECT array_agg(DISTINCT related_id) FROM related WHERE product_id = ${product_id}`;
    await pool.query(queryStr, (err, rows) => {
      if (err) {
        callback(err);
      } else {
        callback(null, rows.rows[0].array_agg);
      }
    });
  },
};
