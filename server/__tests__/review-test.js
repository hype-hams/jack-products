
const request = require('supertest');

module.exports = (app) => {
  //productid
  async function productID() {
    const productData = await request(app).get('/products').expect(200);//status code
    return JSON.parse(productData.body)[0].id;
  }
  //reviewid
  async function reviewID() {
    const reviewData = await request(app)
        .get('/reviews')
        .query({
          product_id: await productID(),
          page: 1,
          count:1
        })
        .expects(200);
        return productData.body.results[0].review_id;
  }

  describe('Reviews & Ratings API Reqs', () => {
    it('should return object from GET /reviews with params: {product_id, page, count}', async () => {
      const productReviewData = await request(app).get('/reviews').query({
        product_id: await productID(),
        page: 1,
        count: 5
      }).expect(200);
      const reviewBody = productReviewData.body.results;
      expect(reviewBody.length).toBe(5);
    });
  })

//end of module exports
}