const amenityService = require('../services/amenityService');

exports.getBookingsByAmenityAndDay = async (req, res) => {
    const {amenityId} = req.params;
    const {timestamp} = req.query;

    try {
        const bookings = await amenityService.getBookingsByAmenityAndDay(amenityId, timestamp);
        if (bookings.length > 0) {
            res.status(200).json(bookings);
        } else {
            res.status(404).json(bookings);
        }
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
};

exports.getUserBookingsByUserId = async (req, res) => {
    const {userId} = req.params;
    try {
        const userBookings = await amenityService.getUserBookings(userId);
        res.status(200).json(userBookings);
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
};
