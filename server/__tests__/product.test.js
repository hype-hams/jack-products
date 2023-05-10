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
      const products = response.body;
      expect(products.length).toEqual(5);
    }));
});

describe('GET /api/products/40347, return the specified product which product_id is 40347', () => {
  it('should return 200', (done) => {
    request(app)
      .get('/api/products/40347')
      .expect(200, done);
  });

  it('should get the product and the id match 40347', () => request(app)
    .get('/api/products/40347')
    .then((response) => {
      const product = response.body;
      expect(product.id).toEqual(40347);
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
      const styles = response.body;
      expect(styles.results[0].style_id).toEqual(241170);
    }));
});
