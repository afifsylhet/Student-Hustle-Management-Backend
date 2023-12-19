const mongoose = require("mongoose");

const borderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter border name"],
    trim: true,
  },
  fatherName: {
    type: String,
    required: [true, "Please enter border's father's name"],
  },
  motherName: {
    type: String,
    required: [true, "Please enter border's mother's name"],
  },

  birthDate: {
    type: Date,
    required: [true, "Please enter border's date of birth"],
  },
  gender: {
    type: String,
    required: [true, "Please enter border's gendar"]
  },
  guardianName: {
    type: String,
    required: [true, "Please enter border's gurdian name"],
  },
  relationWithGuardian: {
    type: String,
    required: [true, "Relation between border and guardian"],
  },
  borderOccupation: {
    type: String,
    required: [true, "Please enter border's occupation"],
  },
  borderPhoneNumber: {
    type: Number,
    required: [true, "Please enter border's phone number"],
    maxLength: [11, "Phone number cann't exced 11 digit"],
  },
  guardianPhoneNumber: {
    type: Number,
    required: [true, "Please enter border's gurdian's phone number"],
    maxLength: [11, "Phone number cann't exced 11 digit"],
  },
  parmanentAddress: {
    type: String,
    required: [true, "Please enter border's address"],
  },
  upazilla: {
    type: String,
    required: [true, "Please enter border's upazilla name"],
  },
  district: {
    type: String,
    required: [true, "Please enter border's district name"],
  },
  occupationalAddress: {
    type: String,
    required: [true, "Please enter border's occupational address"],
  },
  borderStatus: {
    type: String,
    default: "Active",
  },
  roomNumber: {
    type: String,
    required: [true, "Please enter border's room number"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Border", borderSchema);
