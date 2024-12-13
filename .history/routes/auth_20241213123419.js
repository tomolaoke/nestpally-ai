// routes/auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

// @route   POST /api/auth/register
// @desc    Register user or estate agent
// @access  Public
router.post('/register', async (req, res) => { // 'async' keyword present
    // Registration logic...
});

// @route   POST /api/auth/login
// @desc    Authenticate user or estate agent
// @access  Public
router.post('/login', async (req, res) => { // 'async' keyword present
    // Login logic...
});

module.exports = router;
