const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const sendMail = require('../utils/sendMail');


router.post('/book', async (req, res) => {
  try {
    const { childName, mobileNumber, email, state, class: studentClass, password } = req.body;

    const newBooking = new Booking({
      childName,
      mobileNumber,
      email,
      state,
      class: studentClass,
      password
    });

    const saved = await newBooking.save();
    await sendMail(email, password, saved._id);

    res.status(201).json({ message: 'Booking saved and email sent!', id: saved._id });
  } catch (err) {
    console.error('Booking Error:', err.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

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



module.exports = router;
