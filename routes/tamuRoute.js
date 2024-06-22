const express = require('express');
const router = express.Router();
const guestController = require('../controller/guestController');

router.get('/', (req, res) => {
    res.render('tamu/tamu', { title: 'Halaman Tamu' });
});

router.post('/', guestController.addGuest);

module.exports = router;