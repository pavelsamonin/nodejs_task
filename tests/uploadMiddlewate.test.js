const request = require('supertest');
const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const upload = require('../src/middlewares/uploadMiddleware');

const app = express();

app.post('/upload', upload.single('csvFile'), (req, res) => {
    const filePath = req.file.path;
    res.json({ message: 'File uploaded successfully', filePath });
});

const uploadedFiles = [];

describe('Upload Middleware', () => {
    afterAll(async () => {
        await Promise.all(uploadedFiles.map(file => fs.unlink(file).catch(err => console.error(err))));
    })
    test('should upload CSV file successfully', async () => {
        const response = await request(app)
            .post('/upload')
            .attach('csvFile', path.resolve(__dirname, 'fixtures', 'amenity.csv'));

        uploadedFiles.push(response.body.filePath);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'File uploaded successfully');
    });

    test('should handle invalid file type', async () => {
        const response = await request(app)
            .post('/upload')
            .attach('csvFile', path.resolve(__dirname, 'fixtures', 'amenity.txt'));

        expect(response.status).toBe(500);
        expect(response.text).toContain('Invalid file type. Only CSV files are allowed.');
    });
});
