const request = require('supertest');

module.exports = (app) => {
  async function productID() {
    const productData = await request(app).get('/products').expect(200);// status code
    return JSON.parse(productData.body)[0].id;
  }

  async function questionId() {
    const questionData = await request(app)
      .get('/q_a/getQuestion')
      .query({
        product_id: await productID(),
        page: 1,
        count: 1,
      })
      .expects(200);
    return questionData.body.results[0].review_id;
  }

  describe('Questions and Answers API Reqs', () => {
    it('should return object from GET /q_a/getQuestions with params: product_id', async () => {
      const productReviewData = await request(app).get('/reviews').query({
        product_id: await productID(),
      }).expect(200);
      const reviewBody = productReviewData.body.results;
      expect(reviewBody.length).toBe(5);
    });
  });
};
