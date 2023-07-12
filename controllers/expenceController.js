const Expence = require("../models/expneceModel");
const ErrorHandler = require("../utils/errorhandelr");
const catchAsyncErrors = require("../middleware/catchAsyncError");

// add expence
exports.addExpence = catchAsyncErrors(async (req, res, next) => {
  const { amount, sector, expenceName } = req.body;

  const expence = await Expence.create({
    amount, 
    sector, 
    expenceName,
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    expence,
  });
});

// Get Single expence Details
exports.getSingleExpenceDetails = catchAsyncErrors(async (req, res, next) => {
  const expence = await Expence.findById(req.params.id);

  if (!expence) {
    return next(new ErrorHandler("Expence Not found", 404));
  }
  res.status(200).json({
    success: true,
    expence,
  });
});

// Get All expences --Admin
exports.getAllExpences = catchAsyncErrors(async (req, res, next) => {
  const expences = await Expence.find();

  res.status(200).json({
    success: true,
    expences,
  });
});

// Update expence  --Admin
exports.updateExpence = catchAsyncErrors(async (req, res, next) => {
  const expence = await Expence.findById(req.params.id);

  if (!expence) {
    return next(new ErrorHandler("expence not found with this Id", 404));
  }
  expence.amount = req.body.amount;
  expence.sector = req.body.sector;
  expence.expenceName = req.body.expenceName;

  expence.updatedAt = Date.now();

  await expence.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

// Delete a expence -- Admin
exports.deleteExpence = catchAsyncErrors(async (req, res, next) => {
  const expence = await Expence.findById(req.params.id);
  if (!expence) {
    return next(new ErrorHandler("Expence not found with this id", 404));
  }
  await expence.deleteOne();

  res.status(200).json({
    success: true,
  });
});
