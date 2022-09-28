const express = require('express')
const authController = require('../Controller/authController')

const router = express.Router();

router.route('/signup').post(authController.signup)

router.route('/login').post(authController.login)

router.route('/').get(authController.showUser)

router.route('/register').post(authController.register)

module.exports = router