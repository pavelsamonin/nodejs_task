const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');

let server;

beforeAll((done) => {
    server = app.listen(3001, done);
});

afterAll(() => {
    return new Promise((resolve) => {
        server.close(() => {
            mongoose.connection.close().then(() => {
                console.log("Server and MongoDB connection are closed");
                resolve();
            });
        });
    });
});

describe('Amenity Controller', () => {
    describe('GET /amenities/:id', () => {
        test('should get amenity details by ID', async () => {
            const res = await request(server).get('/amenities/1/bookings?timestamp=1592611200000');

            expect(res.status).toEqual(200);
            expect(res.body).toBeInstanceOf(Array);

            res.body.forEach(item => {
                expect(item).toHaveProperty('reservationId');
                expect(item).toHaveProperty('amenityObjectName');
            });
        });

        test('should return 404 for non-existent amenity', async () => {
            const res = await request(server).get('/amenities/999/bookings?timestamp=1592611200000');
            expect(res.status).toEqual(404);
        });
    });
});
