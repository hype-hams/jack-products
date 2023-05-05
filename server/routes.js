const router = require('express').Router();
const controllers = require('./controllers');

// product details
// Retrieves the list of products
router.get('/products', controllers.details.getProduct);
// Returns all product level information for a specified product id
router.get('/products/:product_id', controllers.details.getProductById);
// Returns the all styles available for the given product
router.get('/products/:product_id/styles', controllers.details.getStyles);
// Returns the id's of products related to the product specified
router.get('/products/:product_id/related', controllers.details.getRelated);
// Adds a product to the cart. format: {'sku_id':xxx, 'count':xxx}
router.post('/cart', controllers.details.addCart);
// Retrieves list of products added to the cart by a user
router.get('/cart', controllers.details.getCart);
// Adds an interation to the db
router.post('/interactions', controllers.details.addInteraction);

// //product q_a
// router.get('/', controllers)
// router.post('/', controllers)
//returns related product_ids based on product
router.get('/related/:product_id', controllers.related.getRelatedProducts);

// //related
// router.get('/', controllers)
// router.post('/', controllers)

//reviews:Eric
router.get('/reviews', controllers.reviews.getReviews);
router.get('/reviews/meta', controllers.reviews.getProductBreakdown);
router.post('/reviews', controllers.reviews.postReview);
router.put('/reviews/:review_id/helpful', controllers.reviews.putHelpful);
router.put('/reviews/:review_id/report', controllers.reviews.reportReview);
module.exports = router;
