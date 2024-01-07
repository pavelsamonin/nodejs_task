const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const amenityRoutes = require('../src/routes/amenityRoutes');
const userRoutes = require('../src/routes/userRoutes');
const authRoutes = require('../src/routes/authRoutes');
const csvRoutes = require('../src/routes/csvRoutes');

const app = express();
app.use(bodyParser.json());
app.use('/amenities', amenityRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/csv', csvRoutes);

module.exports = app;

const connectWithRetry = () => {
    return mongoose.connect('mongodb://mongo:27017/nodejs_task', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => {
            console.error('Error connecting to MongoDB:', err.message);
            setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
        });
};
// Start the server if not in testing mode
if (process.env.NODE_ENV !== 'test') {
    connectWithRetry().then(() => {
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    });

}