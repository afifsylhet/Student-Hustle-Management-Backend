const Expence = require("../models/expneceModel");
const ErrorHandler = require("../utils/errorhandelr");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeartures");

// add expence
exports.addExpence = catchAsyncErrors(async (req, res, next) => {
  const { totalAmount, category, expenseDetails, entryBy } = req.body;


  const expence = await Expence.create({
    totalAmount, 
    category, 
    expenseDetails,
    entryBy,
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
  const resultPerPage = 8;
  const expenceCount = await Expence.countDocuments();
  const apiFeatures = new ApiFeatures(Expence.find(), req.query)
  .expenceSearch()
  .filter()
  .pagination(resultPerPage);
  const expences = await apiFeatures.query;

  res.status(200).json({
    success: true,
    expences,
    expenceCount,
    resultPerPage,
  });
});

// Update expence  --Admin
exports.updateExpence = catchAsyncErrors(async (req, res, next) => {

  const expence = await Expence.findById(req.params.id);
  if (!expence) {
    return next(new ErrorHandler("expence not found with this Id", 404));
  }

  expence.totalAmount = req.body.totalAmount;
  expence.category = req.body.category;
  expence.expenseDetails = req.body.expenseDetails;
  expence.entryBy = req.body.entryBy;
  expence.user = req.body.user;


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
