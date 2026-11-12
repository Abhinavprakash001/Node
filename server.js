
const express = require('express');
require('dotenv').config();

const app = express();

const db = require('./db');

app.use(express.json());

const PORT = process.env.PORT || 3000;

const userRoutes = require('./Routes/userRouter');
const candidatesRoutes = require('./Routes/candidatesRoutes');

app.use('/user', userRoutes);
app.use('/candidate', candidatesRoutes);

app.get('/', (req, res) => {
    res.send('Server is working');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`LISTENING ON PORT ${PORT}`);
});
