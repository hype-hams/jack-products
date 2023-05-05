const controllers = require('./controllers');
const router = require('express').Router();



//product details
// router.get('/', controllers)
// router.post('/', controllers)

// //product q_a
router.get('/q_a', controllers.q_a.getQuestions)
router.get('/q_a', controllers.q_a.getAllAnswers)
router.post('/q_a', controllers.q_a.postQuestion)
// router.post('/q_a', controllers.q_a.postAnswer)

// //related
// router.get('/', controllers)
// router.post('/', controllers)

//reviews
router.get('/reviews', controllers.reviews.getReviews);
router.get('/reviews', controllers.reviews.getProductBreakdown);
router.post('/reviews', controllers.reviews.postReview);
router.put('/reviews', controllers.reviews.putHelpful);
router.put('/reviews', controllers.reviews.reportReview);
module.exports = router;
