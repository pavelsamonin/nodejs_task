const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

const revokedTokenSchema = new mongoose.Schema({
    token: String,
});

const RevokedToken = mongoose.model('RevokedToken', revokedTokenSchema);

module.exports = {
    RevokedToken,
    User
};
