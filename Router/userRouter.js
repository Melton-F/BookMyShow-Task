const express = require('express')
const authController = require('../Controller/authController')

const router = express.Router();

router.route('/signup').post(authController.signup)

module.exports = router