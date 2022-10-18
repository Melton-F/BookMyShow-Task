const express = require('express')
const authController = require('../Controller/authController')
const passport = require('passport')
require('../passport')

const router = express.Router();

// router.route('/signup').post(authController.signup)



router.route('/').get(passport.authenticate('jwt',{session:false}),authController.showUser)
router.route('/signup').post(authController.register)
router.route('/otpVerify').post(authController.activateAccountByOTP)
// router.route('/emailVerify').post(authController.EmailVerify)
router.route('/login').post(authController.login)

module.exports = router