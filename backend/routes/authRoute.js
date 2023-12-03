const express = require('express')
const router = express.Router()

//middleware
const { checkUser, updateTimeUsage, checkAdmin } = require('../middleware/middleware')

//controller
const {
    register,
    login,
    sendEmail,
    resetPassword,
    checkRole,
} = require('../controllers/authController')


// register
router.post('/register', checkUser, updateTimeUsage, checkAdmin, register)

// login
router.post('/login', login)

// check user
router.get('/check-role', checkUser, updateTimeUsage, checkRole)

// forgot password
// router.post('/send-email', sendEmail)
router.post('/reset-password',checkUser, updateTimeUsage, checkAdmin, resetPassword)


module.exports = router;