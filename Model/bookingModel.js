const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    movie:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'movie',
        required:true
    },
    theatre:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'CinemaHall',
        required:true
    }
})

const Bookings = mongoose.model('bookTickets', bookingSchema)
module.exports = Bookings