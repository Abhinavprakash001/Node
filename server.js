
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const db = require('./db');

// Allow requests from any origin so the frontend (localhost or deployed) can connect.
// In production you can restrict this to your actual frontend URL:
// app.use(cors({ origin: 'https://your-frontend.onrender.com' }));
app.use(cors());

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
