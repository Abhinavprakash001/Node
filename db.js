
const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.MONGODB_URL;

if (!mongoURL) {
    throw new Error('MONGODB_URL is missing from .env file');
}

mongoose.connect(mongoURL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('MongoDB connection error:', err);
    });

const db = mongoose.connection;

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

module.exports = db;
