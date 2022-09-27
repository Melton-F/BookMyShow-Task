const express = require('express')
const router = express.Router();
const cinemaHallController = require('../Controller/cinemaHallController')

router.route('/')
    .get(cinemaHallController.getCinemas)

router.route('/:id')
    .get(cinemaHallController.getCinemasByID)

module.exports = router