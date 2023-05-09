//App access
require("dotenv").config();
const app = require('../index.js');
//Test Files
const productTest = require('./product-test.js');
const reviewTest = require('./review-test.js');
const qaTest = require('./qa-test.js');
const relatedTest = require('./related-test.js');

//JEST TEST
let server;
//server start
beforeAll(() => {
  server = app.listen(process.env.PORT, () => {
    console.log(`test app server is listening on ${process.env.PORT}`);
  })
});
describe('Server Routes Testing', () => {
  // productTest(app);
  reviewTest(app);
  // qaTest(app);
  // relatedTest(app);
});
//clsoe server
afterAll((done) => {
  server.close(done)
});

