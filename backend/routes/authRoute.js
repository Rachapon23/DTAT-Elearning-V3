const express = require('express')
const router = express.Router()

//middleware
const { checkUser } = require('../middleware/middleware')

//controller
const {
    register,
    login,
    sendEmail,
    resetPassword,
    checkToken,

} = require('../controllers/authController')


// register
router.post('/register', register)

// login
router.post('/login', login)

// forgot password
router.post('/send-email', sendEmail)
router.post('/reset-password', resetPassword)

module.exports = router;