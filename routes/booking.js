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

module.exports = router;

