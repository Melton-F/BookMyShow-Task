const mongoose = require('mongoose')
const validator = require('validator')

const otpSchema = new mongoose.Schema(
    {
        email: {
            type:String,
            required: [true, "Email is required"],
            trim:true,
            // validate:validator.isMail
        },
        otpBMS:{
            type:Number,
            required: [true, "Otp is required"],
            min:4,
            max:4
        },
        isAuthenticated:{
            type:Boolean,
            default:false
        }
    }
)

const Otp = mongoose.model('Otp', otpSchema)
module.exports = Otp