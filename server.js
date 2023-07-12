const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");


// Handling Uncaught Error
// This Error Handelar Should be top of the Server
process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shuting down the server due to uncaught exception");
    process.exit(1);
});

//config
dotenv.config({path:"config/config.env"});


// connecting to database
connectDatabase()

//Must be after database connect set the cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})



const server = app.listen(process.env.PORT, ()=>{
    console.log(`working on port number ${process.env.PORT}`)
})

// Invalid connection String or Unhandled Promise Rejection
// This Error Handler should be the bottom of the server
process.on("unhandledRejection", (err)=>{
    console.log(`Error : ${err.message}`);
    console.log("Shutting Down The Server Due To Unhandled Promise Regection");
    server.close(()=>{
        process.exit(1)
    })
})


