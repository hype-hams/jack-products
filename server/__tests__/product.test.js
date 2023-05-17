/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../index.js');

describe('GET /api/products, return all the products( default 5 )', () => {
  it('should return 200', (done) => {
    request(app)
      .get('/api/products')
      .expect(200, done);
  });

  it('should get a products array with length of 5 by defalut', () => request(app)
    .get('/api/products')
    .then((response) => {
      expect(response.body.length).toEqual(5);
    }));
});

describe('GET /api/products/40347, return the specified product which product_id is 40347', () => {
  it('should return 200', (done) => {
    request(app)
      .get('/api/products/40347')
      .expect(200, done);
  });

  it('should return 500', (done) => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    request(app)
      .get('/api/products/1')
      .expect(500, () => {
        console.log.mockRestore();
        done();
      });
  });

  it('should get the product and the id match 40347', () => request(app)
    .get('/api/products/40347')
    .then((response) => {
      expect(response.body.id).toEqual(40347);
    }));
});

describe('GET /api/products/40450, return all the styles of product which product_id is 40450', () => {
  it('should return 200', (done) => {
    request(app)
      .get('/api/products/40450/styles')
      .expect(200, done);
  });

  it('should get the styles and the first style_id is 241170', () => request(app)
    .get('/api/products/40450/styles')
    .then((response) => {
      expect(response.body.product_id).toEqual('40450');
      expect(response.body.results[0].style_id).toEqual(241170);
    }));

  it('should get the styles and results is an array', () => request(app)
    .get('/api/products/40446/styles')
    .then((response) => {
      expect(Array.isArray(response.body.results)).toBeTruthy();
    }));
});

describe('GET /api/products/40466/related, return all the related product_id of product which product_id is 40366', () => {
  it('should return 200', (done) => {
    request(app)
      .get('/api/products/40366/related')
      .expect(200, done);
  });

  it('should get an array of related product_id', () => request(app)
    .get('/api/products/40366/related')
    .then((response) => {
      expect(response.body).toEqual([41062, 41040, 40792, 40688, 40990]);
    }));
});

describe('POST /api/cart, should be able to get 201 code status after valid posting', () => {
  it('should return 201', (done) => {
    request(app)
      .post('/api/cart')
      .send({ sku_id: 1394755 })
      .expect(201, done);
  });

  it('should return 500 if posting with invalid sku_id', (done) => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    request(app)
      .post('/api/cart')
      .send({ sku_id: 1 })
      .expect(500, () => {
        console.log.mockRestore();
        done();
      });
  });
});

describe('GET /api/cart, should be able to get the data in cart', () => {
  it('should return 200', (done) => {
    request(app)
      .get('/api/cart')
      .expect(200, done);
  });

  it('should get the data in cart', () => request(app)
    .get('/api/cart')
    .then((response) => {
      expect(response.body[0]).toHaveProperty(['sku_id']);
    }));
});

describe('POST /api/interactions, should be able to get 201 code status after valid posting', () => {
  it('should return 201', (done) => {
    request(app)
      .post('/api/interactions')
      .send({ element: 'xxx', widget: 'xxx', time: 'xxx' })
      .expect(201, done);
  });

  it('should return 500 if posting with invalid format', (done) => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    request(app)
      .post('/api/interactions')
      .send({ element: 1, widget: 2, time: 3 })
      .expect(500, () => {
        console.log.mockRestore();
        done();
      });
  });
});
