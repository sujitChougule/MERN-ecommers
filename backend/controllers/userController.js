const User = require("../models/userModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");
const sendtoken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// new user registration
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
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
});

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

//  forgot password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your reset token is \n\n ${resetPasswordUrl} \n\n if you have not requested this email, then please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "ShopNest Password recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordtoken = undefined;
    user.resetPasswordExpired = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

//reset password

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordtoken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordtoken,
    resetPasswordExpired: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Reset password token expired", 400));
  }
  if (req.body.password != req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }
  user.password = req.body.password;
  user.resetPasswordtoken = undefined;
  user.resetPasswordExpired = undefined;
  await user.save();
  sendtoken(user, 200, res);
});
