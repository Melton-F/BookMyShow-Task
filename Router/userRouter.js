const express = require('express')
const authController = require('../Controller/authController')

const router = express.Router();

// router.route('/signup').post(authController.signup)



router.route('/').get(authController.showUser)
router.route('/signup').post(authController.register)
router.route('/otpVerify').post(authController.activateAccountByOTP)
router.route('/emailVerify').post(authController.EmailVerify)
router.route('/login').post(authController.login)

module.exports = router