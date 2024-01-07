const jwt = require('jsonwebtoken');
const {RevokedToken} = require('../models/userModel');

const authenticateToken = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({message: 'Unauthorized'});
    }

    const isRevoked = await RevokedToken.exists({token});
    if (isRevoked) {
        return res.status(401).json({message: 'Token has been revoked'});
    }

    jwt.verify(token, 'secret_key', (err, user) => {
        if (err) {
            return res.status(403).json({message: 'Forbidden'});
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;