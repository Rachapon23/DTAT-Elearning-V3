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
    checkRole,
} = require('../controllers/authController')


// register
router.post('/register', register)

// login
router.post('/login', login)

// check user
router.get('/check-role', checkUser, checkRole)

// forgot password
router.post('/send-email', sendEmail)
router.post('/reset-password', resetPassword)


module.exports = router;