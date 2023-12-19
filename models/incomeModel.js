const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  deposit: {
    type: Number,
  },
  developmentFee: {
    type: Number,
  },
  monthlyFee: {
    type: Number,
    required: true,
  },
  paymentType: {
    type: String,
    required: true, 
  },
  borderId: {
    type: String,
    required: true,
  },
  borderName: {
    type: String,
    required: true,
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
  updatedAt:Date
});

module.exports = mongoose.model("Income", incomeSchema);
