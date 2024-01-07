const express = require('express');
const userController = require('../controllers/authController');
const authenticateToken = require("../middlewares/authMiddleware");
const router = express.Router();

router.post('/signup', userController.register);

router.post('/login', userController.login);

router.post('/logout', authenticateToken, userController.logout);

module.exports = router;
