const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  registrationNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: String,
  dob: String,
  schoolName: String,
  classGrade: String,
  rollNumber: String,
  email: String,
  parentContact: String,
  homeAddress: String,
  subjects: String,
  learningPreferences: String,
  goals: String,
});

module.exports = mongoose.model('User', UserSchema);
