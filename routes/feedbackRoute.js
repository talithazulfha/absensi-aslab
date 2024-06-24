const express = require('express');
const router = express.Router();
const feedbackController = require('../controller/feedbackController');

router.get('/', (req, res) => {
  res.render('tamu/feedback', { title: 'Halaman Feedback' });
});

router.post('/', feedbackController.addFeedback);

module.exports = router;
