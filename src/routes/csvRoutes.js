const express = require('express');
const csvController = require('../controllers/csvController');
const authenticateToken = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.post('/parse-csv',
    authenticateToken,
    upload.single('csvFile'),
    async (req, res) => {
        console.log('File Upload Successful!');
        try {
            const result = await csvController.parseCSV(req.file.path);
            res.status(200).json(result);
        } catch (e) {
            console.error('Parsing ERROR!', e);
            res.status(500).json({error: 'Internal Server Error'});;
        }
    });
module.exports = router;