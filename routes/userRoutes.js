const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register Route
router.post('/register', async (req, res) => {
  const { registrationNumber, password } = req.body;
  try {
    const newUser = new User({ registrationNumber, password });
    await newUser.save();
    res.status(201).json({ message: 'Registration successful', user: newUser });
  } catch (error) {
    res.status(400).json({ message: 'Registration failed', error: error.message });
  }
});

// Update Profile Route
router.post('/profile/update/:registrationNumber', async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { registrationNumber: req.params.registrationNumber },
      req.body,
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    res.status(400).json({ message: 'Profile update failed', error: error.message });
  }
});

// Profile View Route
router.get('/profile/view/:registrationNumber', async (req, res) => {
  try {
    const user = await User.findOne({ registrationNumber: req.params.registrationNumber });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching profile', error: error.message });
  }
});

module.exports = router;
