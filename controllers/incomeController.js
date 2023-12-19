const Income = require("../models/incomeModel");
const ErrorHandler = require("../utils/errorhandelr");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeartures");

// add income
exports.addInocme = catchAsyncErrors(async (req, res, next) => {
  const { deposit, developmentFee, monthlyFee, paymentType, borderId, borderName } = req.body;

  const income = await Income.create({
    borderName,
    borderId,
    deposit, 
    developmentFee,
    monthlyFee,
    paymentType,
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    income,
  });
});

// Get Single income Details
exports.getSingleIncomeDetails = catchAsyncErrors(async (req, res, next) => {
  const income = await Income.findById(req.params.id);

  if (!income) {
    return next(new ErrorHandler("Income Not found", 404));
  }
  res.status(200).json({
    success: true,
    income,
  });
});

// Get All incomes --Admin
exports.getAllIncomes = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const incomeCount = await Income.countDocuments();
  const apiFeatures = new ApiFeatures(Income.find(), req.query)
  .incomeSearch()
  .filter()
  .pagination(resultPerPage);
  const incomes = await apiFeatures.query;
  res.status(200).json({
    success: true,
    incomes,
    incomeCount,
    resultPerPage,
  });
});

// Update income  --Admin
exports.updateIncome = catchAsyncErrors(async (req, res, next) => {
  const income = await Income.findById(req.params.id);

  if (!income) {
    return next(new ErrorHandler("Income not found with this Id", 404));
  }
  income.deposit = req.body.deposit;
  income.developmentFee = req.body.developmentFee;
  income.monthlyFee = req.body.monthlyFee;
  income.borderType = req.body.borderType;

  income.updatedAt = Date.now();

  await income.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

// Delete a income -- Admin
exports.deleteIncome = catchAsyncErrors(async (req, res, next) => {
  const income = await Income.findById(req.params.id);
  if (!income) {
    return next(new ErrorHandler("Income not found with this id", 404));
  }
  await income.deleteOne();

  res.status(200).json({
    success: true,
  });
});
