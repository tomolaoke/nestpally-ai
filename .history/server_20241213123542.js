// server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const apartmentRoutes = require('./routes/apartments');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/apartments', apartmentRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
