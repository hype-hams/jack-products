const controllers = require('./controllers');
const router = require('express').Router();



//product details
// router.get('/', controllers)
// router.post('/', controllers)

// //product q_a
// router.get('/', controllers)
// router.post('/', controllers)

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
