// routes/tryoutRoutes.js
// const express = require("express");
// const router = express.Router();
// const Booking = require("../models/Booking");


// router.get("/tryout/:email", async (req, res) => {
//   try {
//     const user = await Booking.findOne({ email: req.params.email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     res.json({
//       message: "Tryout level fetched successfully",
//       levelUnlocked: user.levelUnlocked,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching tryout level", error: error.message });
//   }
// });


// router.post("/tryout/unlock/:email", async (req, res) => {
//   try {
//     const { newLevel } = req.body; 

//     const user = await Booking.findOne({ email: req.params.email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     user.levelUnlocked = newLevel;
//     await user.save();

//     res.json({ message: "Level unlocked successfully", levelUnlocked: user.levelUnlocked });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to unlock level", error: error.message });
//   }
// });

// module.exports = router;
