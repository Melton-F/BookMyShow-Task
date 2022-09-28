const jwt = require('jsonwebtoken')
const catchAsync = require('../utils/catchAsync')
const User = require('../Model/userModel')
const AppError = require('../utils/appError')
const Otp = require('../Model/otp')
const {validationResult} = require('express-validator')

const JWT_SECRET = "I-am-a-fan-of-ben10-And-this-is-my-secret-message"

const signToken = id =>{
    return jwt.sign({id:id}, JWT_SECRET, {
        expiresIn:"90d"
    })
}

const signup = catchAsync(async(req, res, next)=>{
    // const newUser = await User.create(req.body)

    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        password: req.body.password,
        cnfrmPassword: req.body.cnfrmPassword,
    })

    const token = signToken(newUser._id)


    res.status(201).json({
        status:'Success',
        token,
        data: newUser
    })
})

const login = catchAsync(async(req, res, next)=>{
    const { email, password } = req.body
            //or
    //const email = req.body.email
    //const password = req.body.password
    // console.log(password);

    //1)to check the email and password entered(exist) if not then moving to next with msg
    if(!email || !password){
        return next(new AppError('Please provide email and password', 400))
    }

    //2)check if the user exists & password is correct
    const user = await User.findOne({ email }).select('+password')
    // console.log(user.password)
    // const correct = await user.correctPassword(password, user.password)

    //if there is no user and if there is a wrong password ==> moving to the AppError
    // if(!user || !correct){
    //     return next(new AppError('Invalid Email or Password', 401))
    // }

    //3)if everything alright send token to the user
    // const token = signToken(user._id)
    if(password === user.password){
        res.status(200).json({
            message:"WELCOME TO BOOK MY SHOW APP"
        })
    }else{
        // return next(new AppError('Invalid Email or Password', 401))
        res.status(401).json({
            message:"Invalid Email or Password"
        })
    }
    
})

const showUser = async(req, res, next)=>{
    const user = await User.find().populate('movie')
    res.status(200).json({
        user
    })
}

//register
const register = async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        password: req.body.password,
        cnfrmPassword: req.body.cnfrmPassword,
    })
    const errors = validationResult(req);
    // console.log("The errors are" +":"+ errors)
  
    //^Checking validation errors
    if (!errors.isEmpty()) {
        console.log(errors.array()[0]);
        return next(new AppError(errors.array()[0].msg, 400));
    }
    if (req.body.isAuthenticated) {
        return next(new AppError('Not Authorized', 400));
    }
    //^Generating token
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return next(new AppError('Email already taken', 400));
  }
  
  let otpForEmailVerification = parseInt(Math.random() * 1000000);
  console.log(otpForEmailVerification);
  await Otp.create({
    email: req.body.email,
    OtpBMS: otpForEmailVerification,
  });
  
  const message = `Your verification code for Instagram-clone application 
  is ${otpForEmailVerification}.
  `;
  try {
    await sendEmail({
      email: req.body.email,
      subject: 'Email Verification for Instagram clone',
      message,
    });
  
  res.status(200).json({
    status: 'success',
    message: 'Token sent to email',
    newUser
  });
  } catch (e) {
    console.log(e);
  
  return next(new AppError('Error sending email.Try again later' + e, 500));
  }
  };

module.exports = {
    signup, login, showUser, register
}