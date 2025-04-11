const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

router.post("/bookings", async (req, res) => {
  try {
    const { childName, mobileNumber, email, state } = req.body;

    if (!childName || !mobileNumber) {
      return res.status(400).json({ error: "Child name and mobile number are required." });
    }

    const newBooking = new Booking({ childName, mobileNumber, email, state });
    await newBooking.save();

    res.status(201).json({ message: "Booking saved successfully!" });
  } catch (error) {
    console.error("Error saving booking:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
