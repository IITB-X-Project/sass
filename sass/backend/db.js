const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Database connection successful!");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};


module.exports = connectDB;
