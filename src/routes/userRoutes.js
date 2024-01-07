const express = require('express');
const amenityController = require('../controllers/amenityController');
const router = express.Router();

router.get('/:userId/bookings', amenityController.getUserBookingsByUserId);

module.exports = router;
