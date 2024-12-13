// models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['user', 'estate_agent'],
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    preferences: {
        // Define user preferences for matching
        location: String,
        budget: Number,
        roommates: Number,
        // Add more fields as needed
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);

