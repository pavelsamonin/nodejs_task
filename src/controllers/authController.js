const {User, RevokedToken} = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        res.status(401).json({error: 'Should provide username and password'});
    }
    try {
        const existingUser = await User.findOne({username});
        if (existingUser) {
            return res.status(400).json({message: 'Username already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({message: 'User registered successfully'});
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Internal Server Error'});
    }
};

exports.login = async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        res.status(401).json({error: 'Should provide username and password'});
    }
    const user = await User.findOne({username});
    if (!user) {
        return res.status(401).json({message: 'Invalid credentials'});
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({message: 'Invalid credentials'});
    }
    const token = jwt.sign({username: user.username}, 'secret_key', {expiresIn: '1h'});
    res.json({token});
};

exports.logout = async (req, res) => {
    const token = req.header('Authorization');
    await RevokedToken.create({token});
    res.json({message: 'Logout successful'});
};

