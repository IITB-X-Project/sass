const mongoose = require("mongoose");



const AddressSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true, 
    },
    addresses: [
      {
        address: {
          type: String,
          required: true,
        },
        phone: {
          type: Number,
          required: true, 
        },
      },
    ],
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", AddressSchema);
module.exports = Address;
