const express = require("express");
const router = express.Router();

const { checkUser, checkAdmin, checkTeacher, uploadPublic, uploadPrivate } = require('../middleware/middleware')
const {updateCourseInfo,updateCoursetimeAndRoom
,updateCourseStatus,updateCourseRoom} = require("../controllers/courseUpdateControlle");

router.put("/update-course-info/:id", checkUser, checkTeacher, updateCourseInfo);
router.put("/update-course-status/:id", checkUser, checkTeacher, updateCourseStatus);
router.put("/update-course-room/:id", checkUser, checkTeacher, updateCourseRoom);
// router.post("/update-course-timeandroom/:id", checkUser, checkTeacher, updateCoursetimeAndRoom);

module.exports = router