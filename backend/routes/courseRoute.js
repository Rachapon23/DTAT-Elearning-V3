const express = require("express");
const router = express.Router();

const { checkUser, updateTimeUsage, checkAdmin, checkTeacher, uploadPublic, uploadPrivate } = require('../middleware/middleware')
const {
    createCourse,
    getCourse,
    listCourse,
    removeCourse,
    updateCourse,
    updateEnableCourse,
    updateCourseImage,
    getCourseImage,
    getCourseCount,
    listCourseWoQuiz,
    listCourseGraphData,
} = require("../controllers/courseController");


// teacher 
router.post("/create-course", checkUser, updateTimeUsage, checkTeacher, createCourse);
router.get("/get-course/:id", checkUser, updateTimeUsage, getCourse);
router.get("/list-course", checkUser, updateTimeUsage, listCourse);
router.put("/update-course/:id", checkUser, updateTimeUsage, checkTeacher, updateCourse);
router.delete("/remove-course/:id", checkUser, updateTimeUsage, checkTeacher, removeCourse);


router.put("/update-course/:id/enabled", checkUser, updateTimeUsage, checkTeacher, updateEnableCourse);
router.put("/update-course/:id/image", checkUser, updateTimeUsage, checkTeacher, uploadPublic, updateCourseImage); // uploadPublic uploadPrivate
router.get("/get-course/:id/image", checkUser, updateTimeUsage, checkTeacher, getCourseImage);
router.get("/get-course/sp/count", checkUser, updateTimeUsage, checkTeacher, getCourseCount);
router.get("/list-course/sp/wo/quiz", checkUser, updateTimeUsage, checkTeacher, listCourseWoQuiz);
router.get("/list-course/sp/graph", checkUser, updateTimeUsage, checkTeacher, listCourseGraphData);



// === waite for review =========================================================

// router.put("/update-video", checkUser, updateTimeUsage, checkTeacher, updateCourseVideo);

// router.post("/evaluate-student", checkUser, updateTimeUsage, checkTeacher, evaluateStudent);

// student
// router.post("/add-course", checkUser, updateTimeUsage, addCourse);

// === waite for review =========================================================

module.exports = router