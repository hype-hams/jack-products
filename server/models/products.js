const pool = require('../database');

module.exports = {
  async getAll({ page, count }, callback) {
    const pageNum = page || 1;
    const countNum = count || 5;
    // optimizations:
    // added indexing for product(id)
    const queryStr = `SELECT *
      FROM product
      WHERE id >= ${((pageNum - 1) * 10) + 1}
      LIMIT ${countNum}`;

    await pool.query(queryStr, (err, results) => {
      if (err) {
        callback(err);
      } else if (results.rows) {
        callback(null, results.rows);
      }
    });
  },
  async getOne({ product_id }, callback) {
    // Optimizations:
    // added indexing in schema file for product(id) and feature(product_id)
    // subquery instead of aggregating in the main query
    // group by product.id
    const queryStr = `SELECT
    jsonb_build_object(
        'id', p.id,
        'name', p.name,
        'slogan', p.slogan,
        'description', p.description,
        'category', p.category,
        'default_price', p.default_price,
        'features', f.features
    ) AS result
    FROM product AS p
    JOIN (
    SELECT
        product_id,
        jsonb_agg(
            jsonb_build_object(
                'feature', feature,
                'value', value
            )
        ) AS features
        FROM feature
        WHERE product_id = ${product_id}
        GROUP BY product_id
    ) AS f ON p.id = f.product_id
    WHERE p.id = ${product_id}`;

    await pool.query(queryStr, (err, results) => {
      if (err) {
        callback(err);
      } else if (results.rows) {
        callback(null, results.rows);
      }
    });
  },
};
