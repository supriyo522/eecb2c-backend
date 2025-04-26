// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');

// Register Route
// router.post('/register', async (req, res) => {
//   const { registrationNumber, password } = req.body;
//   try {
//     const newUser = new User({ registrationNumber, password });
//     await newUser.save();
//     res.status(201).json({ message: 'Registration successful', user: newUser });
//   } catch (error) {
//     res.status(400).json({ message: 'Registration failed', error: error.message });
//   }
// });

// Update Profile Route
// router.post('/profile/update/:registrationNumber', async (req, res) => {
//   try {
//     const updatedUser = await User.findOneAndUpdate(
//       { registrationNumber: req.params.registrationNumber },
//       req.body,
//       { new: true }
//     );
//     if (!updatedUser) return res.status(404).json({ message: 'User not found' });
//     res.json({ message: 'Profile updated successfully', user: updatedUser });
//   } catch (error) {
//     res.status(400).json({ message: 'Profile update failed', error: error.message });
//   }
// });

// Profile View Route
// router.get('/profile/view/:registrationNumber', async (req, res) => {
//   try {
//     const user = await User.findOne({ registrationNumber: req.params.registrationNumber });
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     res.json(user);
//   } catch (error) {
//     res.status(400).json({ message: 'Error fetching profile', error: error.message });
//   }
// });




// Update Profile Route
// router.post('/profile/update/:email', async (req, res) => {
//   // console.log("Updating user with email:", req.params.email);
//   try {
//     const updatedUser = await User.findOneAndUpdate(
//       { email: req.params.email },
//       req.body,
//       { new: true }
//     );
//     if (!updatedUser) return res.status(404).json({ message: 'User not found' });
//     res.json({ message: 'Profile updated successfully', user: updatedUser });
//   } catch (error) {
//     res.status(400).json({ message: 'Profile update failed', error: error.message });
//   }
// });

// Profile View Route
// router.get('/profile/view/:email', async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.params.email });
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     res.json(user);
//   } catch (error) {
//     res.status(400).json({ message: 'Error fetching profile', error: error.message });
//   }
// });


// module.exports = router;


const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// @route   POST /api/profile/update/:email
// @desc    Update profile by email
router.post("/profile/update/:email", async (req, res) => {
  try {
    const updatedUser = await Booking.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(400).json({ message: "Profile update failed", error: error.message });
  }
});

// @route   GET /api/profile/view/:email
// @desc    View user profile by email
router.get("/profile/view/:email", async (req, res) => {
  try {
    const user = await Booking.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: "Error fetching profile", error: error.message });
  }
});

module.exports = router;

