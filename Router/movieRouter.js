const express = require('express')
const router = express.Router()

const movieController = require('../Controller/movieController')

router.route('/')
    .get(movieController.getMovies)
    .post(movieController.createMovies)

router.route('/:id')
    .get(movieController.getMoviesById)

module.exports = router


