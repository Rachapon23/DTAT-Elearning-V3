const express = require('express')
const router = express.Router()

//middleware
const { checkUser, checkTeacher, checkAdmin } = require('../middleware/middleware')
const {
    createExam,
    updateExam,
    removeExam,
    listExam,
    getExam,
} = require('../controllers/examController')

// all
router.get("/get-exam/:id", checkUser, getExam);

// teacher
router.post("/create-exam", checkUser, checkTeacher, createExam);
router.put("/update-exam/:id", checkUser, checkTeacher, updateExam);
router.delete("/remove-exam/:id", checkUser, checkTeacher, removeExam);
router.get("/list-exam", checkUser, checkTeacher, listExam);

// student
// router.post("/send-exam", checkUser, sendExam); // move to activit update activity score
// router.get("/get-score", checkUser, getScore); // move to activit get activity score
// router.get("/get-exam-course-student", checkUser, getExamCourseStudent); // change new pattern of API

module.exports = router;