const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Password must be at least 8 characters long"],
    // match: [
    //   /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
    //   "Password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long",
    // ],
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
