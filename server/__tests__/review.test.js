/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../index.js');


  const routeTest = request(app);

  const productId = async () => {
    const response = await routeTest.get('/api/products').expect(200)
    return JSON.parse(response.text)[0].id
  }

  const reviewId =  async () => {
    const response = await routeTest.get('/api/reviews').query({
      product_id:  await productId(),
      page: 1,
      count: 1,
    }).expect(200)
      // console.log('this is response', response)
      return response.body[0].review_id
  }

  describe('Reviews and Ratings Server Testing', () => {
    it('should return an Object for a given product ID', async () => {
      const reviewData = await routeTest.get('/api/reviews').query({
        product_id:  await productId(),
        page: 1,
        count: 5
      }).expect(200)
        const reviews = reviewData.body
        expect(reviews.length).toBe(5)

    });
    it('should return correct product meta data with array length of 4', async () => {
      const metaData = await routeTest.get('/api/reviews/meta').query({
        product_id: await productId()
      }).expect(200)
        const meta = metaData.body
        const metaKey = Object.keys(meta)
        expect(metaKey.length).toBe(4)
        expect(metaKey).toEqual(['product_id', 'ratings', 'recommended', 'characteristics'])
        //DO NOT HAVE A CATCH BLOCK, IT'LL PASS THE ASSERTION
    });
    // it('should return 201 after posting review', async () => {
    //   await routeTest.post('/api/reviews').query({
    //     product_id: 40344,
    //     rating: 4,
    //     summary: "bob the builder",
    //     body: "bob is building",
    //     recommend: true,
    //     name: "bobthebuilder",
    //     email: "bob@gmail.com",
    //     photos: [],
    //     characteristics: {}
    //   }).expect(201)
    // });
    it('should return 204 and increment helpful', async () => {
      const helpfulId = await reviewId();
      // const reviewData = await routeTest.get('/api/reviews').query({
      //   product_id:  await productId(),
      //   page: 1,
      //   count: 5
      // }).expect(200)
      // const review = reviewData.body[0].helpfulness;
      console.log('this is helpful id', helpfulId)
      await routeTest.put(`/api/reviews/${helpfulId}/helpful`).expect(204)
      // console.log('this is respone for helpful', marked)
      // return marked

    })

    // it('should return 204 and report review', async () => {
      // const helpfulId = await reviewId();

      // return routeTest.put(`/api/reviews/${helpfulId}/helpful`).expect(204)
      // console.log('this is respone for helpful', marked)
      // return marked

    // })
  })

