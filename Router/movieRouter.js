const express = require('express')
const router = express.Router()

const movieController = require('../Controller/movieController')

router.route('/')
    .get(movieController.getMovies)
    .post(movieController.createMovies)


router.route('/:id')
    // .get(movieController.getMoviesById)
    .get(movieController.getMoviesbyName)
    .post(movieController.updateTheatreInMovies)
    .patch(movieController.updateTheatreInMovies)
    .delete(movieController.deleteMoviebyID)

router.route('/userUpdate/:id').patch(movieController.updateUsersInTheatre)

router.route('/cancel-ticket/:id').delete(movieController.cancelTickets)


module.exports = router


