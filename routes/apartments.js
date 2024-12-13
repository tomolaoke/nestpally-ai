// routes/apartments.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

const Apartment = require('../models/Apartment');
const User = require('../models/User');

// @route   POST /api/apartments
// @desc    Create a new apartment listing
// @access  Private (Estate Agents and Users)
router.post('/', auth, async (req, res) => {
    const { title, description, location, price, availableRooms, amenities, preferences } = req.body;

    if (!title || !description || !location || !price || !availableRooms) {
        return res.status(400).json({ message: 'Please enter all required fields' });
    }

    const newApartment = new Apartment({
        listedBy: req.user.id,
        title,
        description,
        location,
        price,
        availableRooms,
        amenities,
        preferences
    });

    try {
        const savedApartment = await newApartment.save();
        res.json(savedApartment);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/apartments
// @desc    Get all apartment listings
// @access  Public
router.get('/', async (req, res) => {
    try {
        const apartments = await Apartment.find().populate('listedBy', 'name role');
        res.json(apartments);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/apartments/:id
// @desc    Get single apartment by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const apartment = await Apartment.findById(req.params.id).populate('listedBy', 'name role');
        if (!apartment) return res.status(404).json({ message: 'Apartment not found' });
        res.json(apartment);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   PUT /api/apartments/:id
// @desc    Update an apartment listing
// @access  Private (Only the lister can update)
router.put('/:id', auth, async (req, res) => {
    try {
        const apartment = await Apartment.findById(req.params.id);
        if (!apartment) return res.status(404).json({ message: 'Apartment not found' });

        // Check if the user is the owner
        if (apartment.listedBy.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const { title, description, location, price, availableRooms, amenities, preferences } = req.body;

        if (title) apartment.title = title;
        if (description) apartment.description = description;
        if (location) apartment.location = location;
        if (price) apartment.price = price;
        if (availableRooms) apartment.availableRooms = availableRooms;
        if (amenities) apartment.amenities = amenities;
        if (preferences) apartment.preferences = preferences;

        const updatedApartment = await apartment.save();
        res.json(updatedApartment);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   DELETE /api/apartments/:id
// @desc    Delete an apartment listing
// @access  Private (Only the lister can delete)
router.delete('/:id', auth, async (req, res) => {
    try {
        const apartment = await Apartment.findById(req.params.id);
        if (!apartment) return res.status(404).json({ message: 'Apartment not found' });

        // Check if the user is the owner
        if (apartment.listedBy.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await apartment.remove();
        res.json({ message: 'Apartment removed' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
