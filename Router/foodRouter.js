const express = require('express')
const router = express.Router()

const foodController = require('../Controller/foodController')

router.route('/')
    .get(foodController.getFoods)
    .post(foodController.createFoods)

router.route('/:id')
    .get(foodController.getFoodsById)

module.exports = router

