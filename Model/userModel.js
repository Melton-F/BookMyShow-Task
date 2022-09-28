const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'User name is required'],
        unique:[true, 'User name must be unique']
    },
    email:{
        type:String,
        required:[true, 'Enter your Email'],
        unique:[true, 'mail must be unique'],
        // lowercase:true,
        // validate:[validator.isEmail, 'Please enter a valid Email'] //own validator by installing the validator package
    },
    number:{
        type:Number
    },
    isBooked:{
        
    },
    // photo:{
    //     type:String
    // },
    // passwordChangedAt: Date,
    password:{
        type:String,
        required:[true, 'password is required'],
        minlength:[8, 'Password must have atleast eight characters'],
        // maxlength:[25, 'Password must have maximum of 25 characters']
        // select: false
    },
    cnfrmPassword:{
        type:String,
        required:[true, 'confirm your password'],
        minlength:[8, 'Password must have atleast eight characters'],
        validate:{
            //works only when we creating(create & save) new user details never on update
            validator: function(cnfrmPswd){
                return cnfrmPswd === this.password
            },
            message:'passwords are not same'
        }
    },
    // movieID:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "movie",
    //     required: true
    // }
})


//instance method
// userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
//     //this will reeturn true or false
//     return await bcrypt.compare(candidatePassword, userPassword)
// }

const User = mongoose.model('User', userSchema)
module.exports = User