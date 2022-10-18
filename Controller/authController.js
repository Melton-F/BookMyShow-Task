const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const User = require("../Model/userModel");
const AppError = require("../utils/appError");
const Otp = require("../Model/otp");
// const { validationResult } = require("express-validator");
const sendEmail = require('../utils/sendMail')
// const bcrypt = require('bcrypt')

// const JWT_SECRET = "I-am-a-fan-of-ben10-And-this-is-my-secret-message";

// const signToken = (id) => {
//   return jwt.sign({ id: id }, JWT_SECRET, {
//     expiresIn: "90d",
//   });
// };


exports.showUser = async (req, res, next) => {
  const user = await User.find();
  res.status(200).json({
    user,
  });
};

//register
exports.register = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    // console.log(user)
    return next(new AppError("Email already taken", 400));
  }
  // bcrypt.hash()
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    number: req.body.number,
    password: req.body.password,
    cnfrmPassword: req.body.cnfrmPassword,
  });
 
  if (req.body.isAuthenticated) {  //if is authenticated is false then it was not activated
    return next(new AppError("Not Authorized", 400));
  }

  //verification using OTP

  let otpForEmailVerification = parseInt(Math.random() * 100000);
  console.log(otpForEmailVerification);
  //creating otp collection in database
  await Otp.create({
    email: req.body.email,
    otpBMS: otpForEmailVerification, //BMS=BookMyShow
  });

  const message = `Your otp for book my show registeration is ${otpForEmailVerification}.`;
  try {
    await sendEmail({
      email: req.body.email,
      subject: "Email Verification for BookMyShow",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "your OTP sent to email",
      userDetails:newUser,
    });
  } catch (e) {
    console.log(e);

    return next(new AppError("Error sending email.Try again later" + e, 500));
  }
};

exports.activateAccountByOTP = catchAsync ( async (req, res, next) => {
  const otp = req.body.Otp * 1; //typeCasting
  
  const checkOtpIsValid = await Otp.findOne({
    OtpBMS: otp,
    isAuthenticated: false,
  });
  if (!checkOtpIsValid) {
    return next(new AppError('Invalid Otp', 400));
  }
  checkOtpIsValid.isAuthenticated = true;
  await checkOtpIsValid.save();
  return res.status(200).json({
    status: 'successfully otp verified',
  });
})

// require('./passport')
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //1)to check the email and password entered(exist) if not then moving to next with msg
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  //2)check if the user exists & password is correct
  const user = await User.findOne({ email }).select("+password");
  const payload = {
    userName:user.userName,
    userId: user._id
  }
  const token = jwt.sign(payload, "something-secret-to-be-saved-in-the-env", {expiresIn:"1d"})

  if (password === user.password) {
    return res.status(200).json({
      greet:" WELCOME TO BOOKMYSHOWAPP ",
      message:"successfully logged in.... And here is your token...!!!",
      token: "Bearer " + token
    })
  } else {
    // return next(new AppError('Invalid Email or Password', 401))
    res.status(401).json({
      message: "Invalid Email or Password",
    });
  }
});