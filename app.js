const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const errorMiddleware = require("./middleware/error");

// Cors for cross-origin
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// Import Route
const border = require("./routes/borderRoute");
const user = require("./routes/userRoute");
const room = require("./routes/roomRoute");
const income = require("./routes/incomeRoute");
const expence = require("./routes/expenceRoute");


app.use("/api/v1", border);
app.use("/api/v1", user);
app.use("/api/v1", room);
app.use("/api/v1", income);
app.use("/api/v1", expence);

// Middleware for Error
app.use(errorMiddleware);

module.exports = app;
