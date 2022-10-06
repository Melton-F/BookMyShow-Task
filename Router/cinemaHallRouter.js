const express = require('express')
const router = express.Router();
const cinemaHallController = require('../Controller/cinemaHallController')

router.route('/')
    .get(cinemaHallController.getCinemas)
    .post(cinemaHallController.createCinemas)

router.route('/:id')
    .get(cinemaHallController.getCinemasByID)
    .delete(cinemaHallController.deleteTheatre)

module.exports = router