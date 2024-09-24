const mongoose = require("mongoose");
<<<<<<< HEAD
=======
const connectDB = require("../db"); 
connectDB();
>>>>>>> 313edd4 (adding search feature)

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Cart=mongoose.model("Cart", CartSchema);
module.exports = Cart
