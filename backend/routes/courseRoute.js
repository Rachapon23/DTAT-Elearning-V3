const express = require("express");
const router = express.Router();

const { checkUser, checkAdmin, checkTeacher } = require('../middleware/middleware')
const {
    createCourse,
    getCourse,
    listCourse,
    updateCourse,
    changeEnableCourse,
    removeCourse,
} = require("../controllers/courseController");


// teacher 
router.post("/create-course", checkUser, checkTeacher, createCourse);
router.get("/list-course", checkUser, checkTeacher, listCourse);
router.get("/get-course/:id", checkUser, checkTeacher, getCourse);
router.put("/update-course/:id", checkUser, checkTeacher, updateCourse);
router.delete("/remove-course/:id", checkUser, checkTeacher, removeCourse);

router.put("/change-enable-course/:id", checkUser, checkTeacher, changeEnableCourse);

// === waite for review =========================================================

// router.put("/update-video", checkUser, checkTeacher, updateCourseVideo);

// router.post("/evaluate-student", checkUser, checkTeacher, evaluateStudent);

// student
// router.post("/add-course", checkUser, addCourse);

// === waite for review =========================================================

module.exports = router