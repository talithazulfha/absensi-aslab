const express = require('express');
const router = express.Router();
const presensiPiketController = require('../controller/presensiPiketController');

router.post('/', presensiPiketController.createPresensiPiket);
router.put('/:id', presensiPiketController.updatePresensiPiket);
router.delete('/:id', presensiPiketController.deletePresensiPiket);

module.exports = router;


