const ErrorHandler = require("../utils/errorhandelr.js");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //Wrong Mongodb id error
  if (err.name === "CastError") {
    const message = `Resource not found. invalid : ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Mongoose Duplicate Key Error
  if(err.code === 11000){
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400)
  }

  
  // Worng JWT Error
  if(err.name === "JsonWebTokenError"){
    const message = "Json Web Token is invalid, Please try again";
    err = new ErrorHandler(message, 400)
  }

  // JWT Expire Error
  if(err.name === "TokenExpiredError"){
    const message = "Json Web Token is expired, Please try again";
    err = new ErrorHandler(message, 400)
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
