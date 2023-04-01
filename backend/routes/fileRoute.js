const express = require('express')
const router = express.Router()

//middleware
const {checkUser, checkTeacher, upload } = require('../middleware/middleware')
// const {
//     uploadCourseCover,
// } = require('../controllers/fileController')

// teacher
// router.post("/update-course-cover", checkUser, checkTeacher, upload, updateCourseCover);
// router.post("/upload-file", checkUser, checkTeacher, upload, uploadfile);


module.exports = router;