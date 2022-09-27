const jwt = require('jsonwebtoken')
const catchAsync = require('../utils/catchAsync')
const User = require('../Model/userModel')
const AppError = require('../utils/appError')

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

    //1)to check the email and password entered(exist) if not then moving to next with msg
    if(!email || !password){
        return next(new AppError('Please provide email and password', 400))
    }

    //2)check if the user exists & password is correct
    const user = await User.findOne({ email }).select('+password')
    const correct = await user.correctPassword(password, user.password)

    //if there is no user and if there is a wrong password ==> moving to the AppError
    if(!user || !correct){
        return next(new AppError('Invalid Email or Password', 401))
    }

    //3)if everything alright send token to the user
    // const token = signToken(user._id)
    res.status(200).json({
        status:'success',
        
    })
})

module.exports = {
    signup, login
}