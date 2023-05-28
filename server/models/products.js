const pool = require('../database');

module.exports = {
  async getAll({ page, count }, callback) {
    const pageNum = page || 1;
    const countNum = count || 5;
    // connect the client
    // pool.query handles checkout and termination of connection
    const queryStr = `SELECT * FROM product WHERE id >= ${((pageNum - 1) * 10) + 1} ORDER BY id ASC LIMIT ${countNum}`;
    await pool.query(queryStr, (err, { rows }) => {
      if (err) {
        callback(err);
      } else if (rows) {
        callback(null, rows);
      }
    });
  },
  async getOne({ product_id }, callback) {
    const queryStr = `SELECT product.*, feature.feature, feature.value FROM product JOIN feature ON product.id = feature.product_id WHERE product.id = ${product_id}`;
    await pool.query(queryStr, (err, { rows }) => {
      if (err) {
        callback(err);
      } else if (rows) {
        const tempArr = [];
        for (let i = 0; i < rows.length; i += 1) {
          tempArr.push({
            feature: rows[i].feature,
            value: rows[i].value,
          });
        }
        const result = {
          id: rows[0].id,
          name: rows[0].name,
          slogan: rows[0].slogan,
          description: rows[0].description,
          category: rows[0].category,
          default_price: rows[0].default_price,
          features: tempArr,
        };
        callback(null, result);
      }
    });
  },
};
