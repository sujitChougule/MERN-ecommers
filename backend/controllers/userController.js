const User = require("../models/userModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");
const sendtoken = require("../utils/jwtToken");

// new user registration
exports.registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password,
      avator: {
        public_id: "this is temp id",
        url: "this is sample url",
      },
    });
    //sending token for login cookie
    sendtoken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message || "User not created", 500));
  }
};

// login user

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // to check email and password both are given or not
    if (!email || !password) {
      return next(new ErrorHandler("Enter Email and Password", 400));
    }

    // finding email and password
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
    //sending token for login cookie
    sendtoken(user, 200, res);
  } catch (error) {
    return next(new ErrorHandler(error.message || "User not Logged In", 500));
  }
};

// user Logout

exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    suucess: true,
    message: "Logged Out",
  });
});
