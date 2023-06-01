const pool = require('../database');

module.exports = {
  async getAll({ product_id }, callback) {
    // connect the client
    // pool.query handles checkout of connection and termination
    // Optimizations:
      // use JOINS instead of subqueries for speed
      // add indexing to schema file
      // use jsonb.agg for optimization. Better performance over json.agg
    const queryStr = `SELECT
      style.product_id,
      json_agg(
        json_build_object(
          'style_id', style.id,
          'name', style.name,
          'original_price', style.original_price,
          'sale_price', style.sale_price,
          'default?', style.default_style,
          'photos', (
            SELECT jsonb_agg(
              jsonb_build_object(
                'thumbnail_url', photo.thumbnail_url,
                'url', photo.url
              )
            )
            FROM photo
            WHERE photo.style_id = style.id
          ),
          'skus', (
            SELECT jsonb_object_agg(
              skus.id,
              json_build_object(
                'quantity', skus.quantity,
                'size', skus.size
              )
            )
            FROM skus
            WHERE skus.style_id = style.id
          )
        )
      ) AS results
      FROM style
      JOIN photo ON photo.style_id = style.id
      JOIN skus ON skus.style_id = style.id
      WHERE style.product_id = ${product_id}
      GROUP BY style.product_id, style.id`;

    await pool.query(queryStr, (err, { rows }) => {
      if (err) {
        callback(err);
      } else if (rows) {
        callback(null, rows[0]);
      }
    });
  },
};
