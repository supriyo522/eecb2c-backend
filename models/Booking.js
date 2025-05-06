// const mongoose = require('mongoose');

// const bookingSchema = new mongoose.Schema({
//   childName: String,
//   mobileNumber: String,
//   email: String,
//   state: String,
//   class: String,
//   password: String,
// }, { timestamps: true });

// module.exports = mongoose.model('Booking', bookingSchema);

// const mongoose = require("mongoose");

// const bookingSchema = new mongoose.Schema({
//   childName: {
//     type: String,
//     required: true,
//   },
//   mobileNumber: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//   },
//   class: {
//     type: String,
//     required: true,
//   },
//   state: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// module.exports = mongoose.model("Booking", bookingSchema);


const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  childName: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  class: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  // Profile fields
  fullName: String,
  dob: String,
  schoolName: String,
  classGrade: String,
  rollNumber: String,
  parentContact: String,
  homeAddress: String,
  subjects: String,
  learningPreferences: String,
  goals: String,

unlockedLevels: {
    basic: { type: Boolean, default: true },
    intermediate: { type: Boolean, default: false },
    advanced: { type: Boolean, default: false }
  },
  scores: {
    basic: { type: Number, default: 0 },
    intermediate: { type: Number, default: 0 },
    advanced: { type: Number, default: 0 }
  },

resetPasswordToken: {
  type: String,
},
resetPasswordExpires: {
  type: Date,
},


  createdAt: {
    type: Date,
    default: Date.now,
  }

  
});

module.exports = mongoose.model("Booking", bookingSchema);


