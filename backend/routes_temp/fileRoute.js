const express = require('express')
const router = express.Router()

//middleware
const {checkUser, checkTeacher } = require('../middleware/middleware')
const {
    xxxx,
} = require('../controllers/')


// teacher
router.post("/upload-course-cover", checkUser, checkTeacher, upload, uploadCourseCover);
router.post("/update-course-cover", checkUser, checkTeacher, upload, updateCourseCover);
router.post("/upload-file", checkUser, checkTeacher, upload, uploadfile);


module.exports = router;