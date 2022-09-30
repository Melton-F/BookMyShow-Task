const Bookings = require('../Model/bookingModel')

exports.booknew = async(req, res)=>{
    const newBooking = await Bookings.create(req.body)
    res.status(200).json({
        newBooking
    })
}

exports.showBookings = async(req, res)=>{
    Bookings
        .find()
        .populate('user','email')
        .populate('movie', 'movie_name')
        .populate('theatre', 'name')
        .then(bookings=>{
            res.status(200).json({
                booked_Tickets:bookings
            })
        })
}