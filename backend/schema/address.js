const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    userId: String,
    address: String,
    phone: Number,
  },
  { timestamps:true}
);

const Address = mongoose.model("Address", AddressSchema);
module.exports = Address