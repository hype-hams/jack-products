const controllers = require('./controllers');
const router = require('express').Router();



//product details
// router.get('/', controllers)
// router.post('/', controllers)

// //product q_a
// router.get('/', controllers)
// router.post('/', controllers)

// //related
router.get('/related/:product_id', controllers.related.getRelatedProductID);
// router.post('/', controllers)

//reviews
router.get('/reviews', controllers.reviews.getReviews);
router.get('/reviews', controllers.reviews.getProductBreakdown);
router.post('/reviews', controllers.reviews.postReview);
router.put('/reviews', controllers.reviews.putHelpful);
router.put('/reviews', controllers.reviews.reportReview);
module.exports = router;
