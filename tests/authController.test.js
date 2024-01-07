const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const {RevokedToken} = require('../src/models/userModel');

const mongoUri = 'mongodb://localhost:27017/nodejs_task_test';

let server;

beforeAll(async () => {
    await mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true});
    server = app.listen(3001);
});

afterAll(async () => {
    await mongoose.connection.close();
    server.close();
});

beforeEach(async () => {
    await mongoose.connection.dropDatabase();
});

describe('Authentication', () => {
    test('should create a new user on /signup POST', async () => {
        const res = await request(app)
            .post('/auth/signup')
            .send({username: 'testuser', password: 'testpassword'});

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('message', 'User registered successfully');
    });

    test('should authenticate and return a token on /login POST', async () => {
        await request(app)
            .post('/auth/signup')
            .send({username: 'testuser', password: 'testpassword'});

        const loginRes = await request(app)
            .post('/auth/login')
            .send({username: 'testuser', password: 'testpassword'});

        expect(loginRes.status).toBe(200);
        expect(loginRes.body).toHaveProperty('token');
    });

    test('should revoke the token on /logout POST', async () => {
        await request(app)
            .post('/auth/signup')
            .send({username: 'testuser', password: 'testpassword'});

        const loginRes = await request(app)
            .post('/auth/login')
            .send({username: 'testuser', password: 'testpassword'});

        const token = loginRes.body.token;

        const logoutRes = await request(app)
            .post('/auth/logout')
            .set('Authorization', token);

        expect(logoutRes.status).toBe(200);
        expect(logoutRes.body).toHaveProperty('message', 'Logout successful');

        const revokedToken = await RevokedToken.findOne({ token });
        const isRevoked = !!revokedToken;
        expect(isRevoked).toBe(true);
    });
});
