const express = require("express");
const router = express.Router();

const { checkUser, updateTimeUsage, checkAdmin, checkTeacher, uploadPublic, uploadPrivate } = require('../middleware/middleware')
const {updateCourseInfo,updateCoursetimeAndRoom
,updateCourseStatus,updateCourseRoom} = require("../controllers/courseUpdateControlle");

router.put("/update-course-info/:id", checkUser, updateTimeUsage, checkTeacher, updateCourseInfo);
router.put("/update-course-status/:id", checkUser, updateTimeUsage, checkTeacher, updateCourseStatus);
router.put("/update-course-room/:id", checkUser, updateTimeUsage, checkTeacher, updateCourseRoom);
// router.post("/update-course-timeandroom/:id", checkUser, updateTimeUsage, checkTeacher, updateCoursetimeAndRoom);

module.exports = router