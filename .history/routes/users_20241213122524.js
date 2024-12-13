// routes/users.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

const User = require('../models/User');
const Apartment = require('../models/Apartment');

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, async (req, res) => {
    const { name, preferences } = req.body;

    const updateFields = {};
    if (name) updateFields.name = name;
    if (preferences) updateFields.preferences = preferences;

    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: updateFields },
            { new: true }
        ).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/users/match
// @desc    Get matched roommates and apartments
// @access  Private
router.get('/match', auth, async (req, res) => {
    try {
        const currentUser = await User.findById(req.user.id);
        if (!currentUser) return res.status(404).json({ message: 'User not found' });

        // Simple matching logic based on location and preferences
        const matchedUsers = await User.find({
            _id: { $ne: currentUser.id },
            'preferences.location': currentUser.preferences.location
            // Add more matching criteria as needed
        });

        const matchedApartments = await Apartment.find({
            location: currentUser.preferences.location
            // Add more matching criteria as needed
        });

        res.json({
            roommates: matchedUsers,
            apartments: matchedApartments
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Simplified example from /api/users/match route

const matchedUsers = await User.find({
    _id: { $ne: currentUser.id },
    'preferences.location': currentUser.preferences.location
    // Add more matching criteria as needed
});

const matchedApartments = await Apartment.find({
    location: currentUser.preferences.location
    // Add more matching criteria as needed
});


module.exports = router;
