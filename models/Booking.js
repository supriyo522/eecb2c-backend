const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  childName: String,
  mobileNumber: String,
  email: String,
  state: String,
  class: String,
  password: String,
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
