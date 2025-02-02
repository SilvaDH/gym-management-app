// Backend: index.js
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();

const port = process.env.PORT || 8000;
const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
    console.error("❌ JWT_SECRET is missing in .env file");
    process.exit(1);
}

// Import routes
const testRoute = require('./routes/test');
const userRoute = require('./routes/users/userRoutes');
const gymRoute = require('./routes/gym/gymRoutes');

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('✅ Connected to the DB'))
  .catch(err => console.log('❌ DB Connection Error:', err));

// Middleware
app.use(express.json());
app.use(cors());

// Route middleware
app.use('/api_v1/test', testRoute);
app.use('/api_v1/users', userRoute);
app.use('/api_v1/gym', gymRoute);

// Handling unmatched routes
app.use((req, res) => {
    res.status(404).json({
        error: true,
        message: 'Invalid route. Please check the API documentation.'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('❌ Server Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});