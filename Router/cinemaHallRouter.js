const express = require('express')
const router = express.Router();

const passport = require('passport')
require('../passport')

const cinemaHallController = require('../Controller/cinemaHallController')
// const {getCinemas, createCinemas} = require('../Controller/cinemaHallController')

// router.route('/')
//     .get(cinemaHallController.getCinemas)
//     .post(cinemaHallController.createCinemas)

router.route('/')
    .get(passport.authenticate('jwt',{session:false}),cinemaHallController.getCinemas)
    .post(passport.authenticate('jwt',{session:false}),cinemaHallController.createCinemas)

router.route('/:id')
    .get(passport.authenticate('jwt',{session:false}),cinemaHallController.getCinemasByID)
    .delete(passport.authenticate('jwt',{session:false}),cinemaHallController.deleteTheatre)

module.exports = router