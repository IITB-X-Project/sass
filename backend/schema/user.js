const mongoose = require("mongoose");
const connectDB = require("../db"); 
connectDB();

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  isSeller: {  
    type: Boolean,
    default: false,
  },
  isDuesCleared: { 
    type: Boolean,
    default: true,  
  },
  searchHistory:{
    type:Array,
    default:[]
}
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
