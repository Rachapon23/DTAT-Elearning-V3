const express = require("express");
const router = express.Router();

const { checkUser, checkAdmin, checkTeacher, uploadPublic, uploadPrivate } = require('../middleware/middleware')
const {
    createCourse,
    getCourse,
    listCourse,
    removeCourse,
    // updateCourse,
    // updateEnableCourse,
    // updateCourseImage,
    // getCourseImage,
    // getCourseCount,
    listCourseWoQuiz,
    // listCourseGraphData,
} = require("../controllers/courseController");


// teacher 
router.post("/create-course", checkUser, checkTeacher, createCourse);
router.get("/get-course/:id", checkUser, checkTeacher, getCourse);
router.get("/list-course", checkUser, checkTeacher, listCourse);
router.delete("/remove-course/:id", checkUser, checkTeacher, removeCourse);

// router.put("/update-course/:id", checkUser, checkTeacher, updateCourse);

// router.put("/update-course/:id/enabled", checkUser, checkTeacher, updateEnableCourse);
// router.put("/update-course/:id/image", checkUser, checkTeacher, uploadPublic, updateCourseImage); // uploadPublic uploadPrivate
// router.get("/get-course/:id/image", checkUser, checkTeacher, getCourseImage);
// router.get("/get-course/sp/count", checkUser, checkTeacher, getCourseCount);
router.get("/list-course/sp/wo/quiz", checkUser, checkTeacher, listCourseWoQuiz);
// router.get("/list-course/sp/graph", checkUser, checkTeacher, listCourseGraphData);



// === waite for review =========================================================

// router.put("/update-video", checkUser, checkTeacher, updateCourseVideo);

// router.post("/evaluate-student", checkUser, checkTeacher, evaluateStudent);

// student
// router.post("/add-course", checkUser, addCourse);

// === waite for review =========================================================

module.exports = router