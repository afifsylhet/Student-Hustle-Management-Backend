const Border = require("../models/borderModel");
const ErrorHandler = require("../utils/errorhandelr");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeartures");

// add border -- Admin
exports.addBorder = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const border = await Border.create(req.body);
  res.status(201).json({
    success: true,
    border,
  });
});

// Get All Border
exports.getAllBorders = catchAsyncError(async (req, res) => {
  const resultPerPage = 8;
  const borderCount = await Border.countDocuments();
  const apiFeatures = new ApiFeatures(Border.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
    const borders = await apiFeatures.query;
  res.status(200).json({
    success: true,
    borders,
    borderCount,
    resultPerPage,
  });
});

// Update border -- Admin
exports.updateBorder = catchAsyncError(async (req, res, next) => {
  let border = await Border.findById(req.params.id);
 console.log(req.body , req.params.id)
  if (!border) {
    return next(new ErrorHandler("Border Not found", 404));
  }
  border = await Border.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    sucess: true,
    border,
  });
});

// Delete border -- Admin
exports.deleteBorder = catchAsyncError(async (req, res, next) => {
  const border = await Border.findById(req.params.id);

  if (!border) {
    return next(new ErrorHandler("Border Not found", 404));
  }
  await border.deleteOne();

  res.status(200).json({
    success: true,
    message: "Border deleted successfully",
  });
});

// Get Single border Details
exports.getBorderDetails = catchAsyncError(async (req, res, next) => {
  const border = await Border.findById(req.params.id);

  if (!border) {
    return next(new ErrorHandler("Border Not found", 404));
  }
  res.status(200).json({
    success: true,
    border,
  });
});

