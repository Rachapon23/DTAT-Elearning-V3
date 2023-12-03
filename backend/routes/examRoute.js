const express = require('express')
const router = express.Router()

//middleware
const { checkUser, updateTimeUsage, checkTeacher, checkAdmin, uploadPrivate, uploadPublic } = require('../middleware/middleware')
const {
    createExam,
    updateExam,
    removeExam,
    listExam,
    getExam,
    getExamImage,
    updateExamEnable
} = require('../controllers/examController')

// all
router.get("/get-exam/:id", checkUser, updateTimeUsage, getExam);

// teacher
router.post("/create-exam", checkUser, updateTimeUsage, checkTeacher, uploadPrivate, createExam);
router.put("/update-exam/:id", checkUser, updateTimeUsage, checkTeacher, updateExam);
router.put("/update-exam/:id/enable", checkUser, updateTimeUsage, checkTeacher, updateExamEnable);
router.delete("/remove-exam/:id", checkUser, updateTimeUsage, checkTeacher, removeExam);
router.get("/list-exam", checkUser, updateTimeUsage, checkTeacher, listExam);
router.get("/get-exam/:id/image", checkUser, updateTimeUsage, checkTeacher, getExamImage);


// student
// router.post("/send-exam", checkUser, updateTimeUsage, sendExam); // move to activit update activity score
// router.get("/get-score", checkUser, updateTimeUsage, getScore); // move to activit get activity score
// router.get("/get-exam-course-student", checkUser, updateTimeUsage, getExamCourseStudent); // change new pattern of API

module.exports = router;