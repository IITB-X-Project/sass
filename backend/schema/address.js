const mongoose = require("mongoose");

const connectDB = require("../db"); 
connectDB();

const AddressSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true, // Ensure userId is required
    },
    addresses: [
      {
        address: {
          type: String,
          required: true, // Ensure address is required
        },
        phone: {
          type: Number,
          required: true, // Ensure phone is required
        },
      },
    ],
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", AddressSchema);
module.exports = Address;
