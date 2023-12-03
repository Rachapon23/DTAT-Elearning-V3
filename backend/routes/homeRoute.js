const express = require('express')
const router = express.Router()

const { checkUser, updateTimeUsage, checkTeacher, checkAdmin ,uploadPublic } = require('../middleware/middleware')

const {
    createAnnounce,
    getHome,
    updateAnnounce,
    updateCoursePublic,
    removeCoursePublic,
} = require('../controllers/homeController')


// carousel wait for upload file system
router.post('/create-announce', checkUser, updateTimeUsage, checkAdmin, uploadPublic, createAnnounce)
router.put('/update-announce', checkUser, updateTimeUsage, checkAdmin, uploadPublic, updateAnnounce)
// router.put('/remove-carousel', checkUser, updateTimeUsage, checkAdmin, removeCarousel)

// public course
router.put('/update-course-public', checkUser, updateTimeUsage, checkAdmin, updateCoursePublic)
router.delete('/remove-course-public', checkUser, updateTimeUsage, checkAdmin, removeCoursePublic)

// private course
// router.post('/add-course-private', checkUser, updateTimeUsage, checkAdmin, addCoursePrivate)
// router.post('/remove-course-private', checkUser, updateTimeUsage, checkAdmin, removeCoursePrivate)

// list home (display all item in home page)
router.get('/get-home', getHome)

module.exports = router;