const express = require('express')
const router = express.Router()

//middleware
const {checkUser, checkTeacher, checkAdmin} = require('../middleware/middleware')
const {
    xxxx,
} = require('../controllers/')

// teacher
router.post("/create-exam", checkUser, checkTeacher, createExam);
router.put("/update-exam/:id", checkUser, checkTeacher, updateExam);
router.delete("/remove-exam/:id", checkUser, checkTeacher, removeExam);
router.get("/remove-exam/:id", checkUser, checkTeacher, listExam);
router.get("/get-exam-course-teacher", checkUser, checkTeacher, getExamCourseTeacher);


// student
router.post("/send-exam", checkUser, sendExam);
router.get("/get-score", checkUser, getScore);
router.get("/get-exam-course-student", checkUser, getExamCourseStudent);

module.exports = router;