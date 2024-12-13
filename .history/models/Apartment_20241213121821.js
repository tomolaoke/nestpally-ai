// models/Apartment.js

const mongoose = require('mongoose');

const ApartmentSchema = new mongoose.Schema({
    listedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: String,
    description: String,
    location: String,
    price: Number,
    availableRooms: Number,
    amenities: [String],
    preferences: {
        // Define preferences related to the apartment
        // e.g., gender preference, pet policy, etc.
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Apartment', ApartmentSchema);
