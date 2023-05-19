const express = require("express");
const router = express.Router();

const { checkUser, checkAdmin, checkTeacher, uploadPublic, uploadPrivate } = require('../middleware/middleware')
const {updateCourseInfo,updateCoursetimeAndRoom} = require("../controllers/courseController_master");

router.put("/update-course-info/:id", checkUser, checkTeacher, updateCourseInfo);
router.post("/update-course-timeandroom/:id", checkUser, checkTeacher, updateCoursetimeAndRoom);

module.exports = router