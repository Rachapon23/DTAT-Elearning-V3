const express = require('express')
const router = express.Router()

const {
    xxxx,
} = require('../controllers/')


// carousel wait for upload file system
// router.post('/create-carousel', checkUser, checkAdmin, upload, createCarousel)
// router.put('/remove-carousel', checkUser, checkAdmin, removeCarousel)

// public course
router.post('/add-course-public', checkUser, checkAdmin, addCoursePublic)
router.post('/remove-course-public', checkUser, checkAdmin, removeCoursePublic)

// private course
router.post('/add-course-private', checkUser, checkAdmin, addCoursePrivate)
router.post('/remove-course-private', checkUser, checkAdmin, removeCoursePrivate)

// list home (display all item in home page)
router.get('/list-home', checkUser, listHome)

module.exports = router;