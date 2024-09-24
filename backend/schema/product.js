const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    averageReview: Number,
    isAvailable: {
      type: Boolean,
      default: true,
    },
    tags: [String],
  },
  { timestamps: true }
);

const Product=mongoose.model("Product", ProductSchema);
module.exports = Product