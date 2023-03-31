const express = require('express')
const router = express.Router()

const { checkUser, checkTeacher, checkAdmin } = require('../middleware/middleware')
const {
    xxxx,
} = require('../controllers/')

//route
router.get('/route-user', checkUser, returnRoute)
router.get('/route-teacher', checkUser, checkTeacher, returnRoute)
router.get('/route-admin', checkUser, checkTeacher, checkAdmin, returnRoute)

module.exports = router;