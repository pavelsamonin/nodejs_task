const express = require('express');
const amenityController = require('../controllers/amenityController');

const router = express.Router();

router.get('/:amenityId/bookings', amenityController.getBookingsByAmenityAndDay);

module.exports = router;
