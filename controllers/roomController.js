const Room = require("../models/roomModel");
const ErrorHandler = require("../utils/errorhandelr");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeartures");

// add room
exports.addRoom = catchAsyncErrors(async (req, res, next) => {
  const { roomNumber, floorNumber, roomType, roomStatus, entryBy } = req.body;

  const room = await Room.create({
    roomNumber,
    floorNumber,
    roomType,
    roomStatus,
    entryBy,
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    room,
  });
});

// Get Single Room Details
exports.getSingleRoomDetails = catchAsyncErrors(async (req, res, next) => {
  const room = await Room.findById(req.params.id);

  if (!room) {
    return next(new ErrorHandler("Room Not found", 404));
  }
  res.status(200).json({
    success: true,
    room,
  });
});

// Get All Room --Admin
exports.getAllRooms = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const roomCount = await Room.countDocuments();
  const apiFeatures = new ApiFeatures(Room.find(), req.query)
  .roomSearch()
  .filter()
  .pagination(resultPerPage);
  const rooms = await apiFeatures.query;
  res.status(200).json({
    success: true,
    rooms,
    roomCount,
    resultPerPage,
  });
});


// Update Room Status --Admin
exports.updateRoom = catchAsyncErrors(async (req, res, next) => {
  const room = await Room.findById(req.params.id);

  if (!room) {
    return next(new ErrorHandler("Room not found with this Id", 404));
  }
  room.roomNumber = req.body.roomNumber;
  room.floorNumber = req.body.floorNumber;
  room.roomStatus = req.body.roomStatus;
  room.roomType = req.body.roomType;

  if (req.body.roomStatus === "Booked") {
    room.bookedAt = Date.now();
  }

  await room.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

// Delete a room -- Admin
exports.deleteroom = catchAsyncErrors(async (req, res, next) => {
  const room = await Room.findById(req.params.id);
  if (!room) {
    return next(new ErrorHandler("Room not found with this id", 404));
  }
  await room.deleteOne();

  res.status(200).json({
    success: true,
  });
});
