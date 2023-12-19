const mongoose = require("mongoose");

const expenceSchema = new mongoose.Schema({
  totalAmount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  expenseDetails: {
    type: String,
    required: true,
  },
  entryBy: {
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

module.exports = mongoose.model("Expence", expenceSchema);
