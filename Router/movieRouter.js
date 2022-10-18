const express = require('express')
const router = express.Router()

const passport = require('passport')
require('../passport')

const movieController = require('../Controller/movieController')

router.route('/')
    .get(passport.authenticate('jwt',{session:false}),movieController.getMovies)
    .post(passport.authenticate('jwt',{session:false}),movieController.createMovies)


router.route('/:id')
    // .get(movieController.getMoviesById)
    .get(passport.authenticate('jwt',{session:false}),movieController.getMoviesbyName)
    .post(passport.authenticate('jwt',{session:false}),movieController.updateTheatreInMovies)
    .patch(passport.authenticate('jwt',{session:false}),movieController.updateTheatreInMovies)
    .delete(passport.authenticate('jwt',{session:false}),movieController.deleteMoviebyID)

router.route('/userUpdate/:id').patch(passport.authenticate('jwt',{session:false}),movieController.updateUsersInTheatre)

router.route('/cancel-ticket/:id').delete(movieController.cancelTickets)


module.exports = router


