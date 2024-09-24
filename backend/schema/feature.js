const mongoose = require("mongoose");
<<<<<<< HEAD
=======
const connectDB = require("../db"); 
connectDB();
>>>>>>> 313edd4 (adding search feature)

const FeatureSchema = new mongoose.Schema(
  {
    image: String,
  },
  { timestamps: true }
);

const Feature=mongoose.model("Feature", FeatureSchema);
module.exports = Feature