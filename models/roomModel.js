const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
  },
  floorNumber: {
    type: String,
    required: true,
  },
  roomType: {
    type: String,
    required: true,
  },
  roomStatus: {
    type: String,
    default: "Empty",
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
  
  bookedAt:Date

});

module.exports = mongoose.model("Room", roomSchema)
