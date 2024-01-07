const amenityService = require('../services/amenityService');

jest.mock('../services/amenityService', () => ({
    ...jest.requireActual('../services/amenityService'),
    parseCSV: jest.fn(),
}));

describe('Amenity Service', () => {
    describe('getBookingsByAmenityAndDay', () => {
        test('should return bookings for a specific amenity and day', async () => {

            const result = await amenityService.getBookingsByAmenityAndDay('1', '1592611200000');

            expect(result).toEqual([{
                "reservationId": "103",
                "userId": "4",
                "startTime": "9:00",
                "duration": 480,
                "amenityObjectName": "Mitel Networks Corporation"
            }, {
                "reservationId": "1",
                "userId": "97",
                "startTime": "10:00",
                "duration": 300,
                "amenityObjectName": "Mitel Networks Corporation"
            }]);
        });

        test('should return an empty array for a non-existent amenity', async () => {
            const amenityData = [];
            const reservationsData = [
                {id: '1', amenity_id: '1', user_id: '1', start_time: '300', end_time: '480', date: '1593648000000'},
            ];

            amenityService.parseCSV.mockResolvedValueOnce(amenityData);
            amenityService.parseCSV.mockResolvedValueOnce(reservationsData);

            const result = await amenityService.getBookingsByAmenityAndDay('1', '1593648000000');

            expect(result).toEqual([]);
        });
    });
});
