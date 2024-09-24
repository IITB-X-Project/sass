const mongoose = require("mongoose");
<<<<<<< HEAD
=======
const connectDB = require("../db"); 
connectDB();
>>>>>>> 313edd4 (adding search feature)

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