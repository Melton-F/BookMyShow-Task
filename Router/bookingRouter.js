const express = require('express')
const router = express.Router()
const bookingController = require('../Controller/bookingController')

router.route('/').post(bookingController.booknew).get(bookingController.showBookings)

module.exports = router