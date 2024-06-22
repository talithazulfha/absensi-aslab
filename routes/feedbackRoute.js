const express = require('express');
const router = express.Router();
const feedbackController = require('../controller/feedbackController');

// Halaman umpan balik
router.get('/', (req, res) => {
  res.render('tamu/feedback', { title: 'Halaman Feedback' });
});

// Proses pengiriman umpan balik
router.post('/', feedbackController.addFeedback);

module.exports = router;
