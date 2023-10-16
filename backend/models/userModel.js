const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  role: {
    type: String,
    default: "user",
  },
  name: {
    type: String,
    required: [true, "Please Enter your name"],
    maxLen: [30, "name cannot be more than 30 characters"],
    minLen: [4, "name cannot be less than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Enter your email"],
    unique: [true, "Email is already used"],
    validate: [validator.isEmail, "Enter valid email"],
  },
  password: {
    type: String,
    require: [true, "Enter your password"],
    select: false, //by these will not be show while using .find()
    minLen: [8, "name cannot be less than 4 characters"],
  },
  avator: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  resetPasswordtoken: String,
  resetPasswordExpired: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRETE, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
