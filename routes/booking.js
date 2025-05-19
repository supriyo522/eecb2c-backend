// const express = require('express');
// const router = express.Router();
// const Booking = require('../models/Booking');
// const sendMail = require('../utils/sendMail');



// router.post('/book', async (req, res) => {
//   try {
//     const { childName, mobileNumber, email, state, class: studentClass, password } = req.body;

//     const newBooking = new Booking({
//       childName,
//       mobileNumber,
//       email,
//       state,
//       class: studentClass,
//       password
//     });

//     const saved = await newBooking.save();
//     await sendMail(email, password, saved._id);

//     res.status(201).json({ message: 'Booking saved and email sent!', id: saved._id });
//   } catch (err) {
//     console.error('Booking Error:', err.message);
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// });

// router.post('/login', async (req, res) => {
//   try {
//     const { objectId, password } = req.body;

//     const user = await Booking.findById(objectId);
//     if (!user) {
//       return res.status(404).json({ error: 'Invalid ID' });
//     }

//     if (user.password !== password) {
//       return res.status(401).json({ error: 'Incorrect password' });
//     }

//     res.status(200).json({ message: 'Login successful', studentClass: user.class });
//   } catch (err) {
//     console.error('Login Error:', err.message);
//     res.status(500).json({ error: 'Server error' });
//   }
// });



// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcryptjs");
// const Booking = require("../models/Booking");


// router.post("/book-session", async (req, res) => {
//   const {
//     childName,
//     mobileNumber,
//     email,
//     class: userClass,
//     state,
//     password,
//     confirmPassword,
//   } = req.body;

//   if (password !== confirmPassword) {
//     return res.status(400).json({ message: "Passwords do not match." });
//   }

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newBooking = new Booking({
//       childName,
//       mobileNumber,
//       email,
//       class: userClass,
//       state,
//       password: hashedPassword,
//     });

//     await newBooking.save();
//     res.status(201).json({ message: "Session booked successfully!" });
//   } catch (err) {
//     res.status(500).json({ message: "Error booking session", error: err.message });
//   }
// });

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await Booking.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid email or password." });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid email or password." });
//     }

//     res.status(200).json({
//       message: "Login successful",
//       user: {
//         childName: user.childName,
//         email: user.email,
//         class: user.class,
//         state: user.state,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Login failed", error: err.message });
//   }
// });




// module.exports = router;


const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Booking = require("../models/Booking");
const sendEmail = require('../utils/sendMail');
const crypto = require("crypto");

// @route   POST /api/book-session
// @desc    Book a free session
router.post("/book-session", async (req, res) => {
  const {
    childName,
    mobileNumber,
    email,
    class: userClass,
    state,
    password,
    confirmPassword,
  } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  try {

    const existingUser = await Booking.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newBooking = new Booking({
      childName,
      mobileNumber,
      email,
      class: userClass,
      state,
      password: hashedPassword,
    });

    await newBooking.save();
    res.status(201).json({ message: "Session booked successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error booking session", error: err.message });
  }
});

// @route   POST /api/login
// @desc    Login with email and password
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Booking.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        childName: user.childName,
        email: user.email,
        class: user.class,
        state: user.state,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

// router.post("/request-password-reset", async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await Booking.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     const token = crypto.randomBytes(20).toString("hex");

//     user.resetPasswordToken = token;
//     user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

//     await user.save();

//     // In production, send via email. For now, return the reset link.
//     const resetLink = `http://localhost:3000/api/reset-password/${token}`;

//     res.status(200).json({
//       message: "Password reset link generated.",
//       resetLink,
//     });
//   } catch (err) {  json({ message: "Error generating reset token", error: err.message });
//   }
// });


router.post("/request-password-reset", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Booking.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const token = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetLink = `https://eecb2c-frontend.vercel.app/reset-password.html?token=${token}`;

    const emailContent = `
      <h2>Password Reset</h2>
      <p>Hello ${user.childName},</p>
      <p>You requested a password reset. Click below to reset your password:</p>
      <a href="${resetLink}" target="_blank">${resetLink}</a>
      <p>This link expires in 1 hour.</p>
    `;

    await sendEmail(user.email, "Password Reset Request", emailContent);

    res.status(200).json({ message: "Password reset link sent to email." });
  } catch (err) {
    res.status(500).json({ message: "Error generating reset token", error: err.message });
  }
});


router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  try {
    const user = await Booking.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful." });
  } catch (err) {
    res.status(500).json({ message: "Reset failed", error: err.message });
  }
});


module.exports = router;

