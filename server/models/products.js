const pool = require('../database');

module.exports = {
  async getAll({ page, count }, callback) {
    const pageNum = page || 1;
    const countNum = count || 5;
    // connect the client
    // pool.query handles checkout and termination of connection
    const queryStr = `SELECT * FROM product WHERE id >= ${((pageNum - 1) * 10) + 1} ORDER BY id ASC LIMIT ${countNum}`;
    await pool.query(queryStr, (err, results) => {
      if (err) {
        callback(err);
      } else if (results.rows) {
        callback(null, results.rows);
      }
    });
  },
  async getOne({ product_id }, callback) {
    const queryStr = `SELECT
    json_build_object(
        'id', p.id,
        'name', p.name,
        'slogan', p.slogan,
        'description', p.description,
        'category', p.category,
        'default_price', p.default_price,
        'features', json_agg(
            json_build_object(
                'feature', f.feature,
                'value', f.value
            )
        )
    ) AS result
    FROM product AS p
    JOIN feature AS f ON p.id = f.product_id
    WHERE p.id = ${product_id}
    GROUP BY p.id, p.name, p.slogan, p.description, p.default_price`;

    await pool.query(queryStr, (err, results) => {
      if (err) {
        callback(err);
      } else if (results.rows) {
        callback(null, results.rows);
      }
    });
  },
};
