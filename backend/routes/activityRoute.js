
const express = require('express')
const router = express.Router()
const {checkUser, checkTeacher, checkAdmin} = require('../middleware/middleware')
const {
    createActivity,
    listActivityCourse,
    updateActivityProgress,
    getActivityProgress,
} = require('../controllers/activityController')

// teacher
router.get("/list-activity/course/:id", checkUser, checkTeacher, listActivityCourse);

// we still have to add these API?
// router.get("/get-my-history-teacher", checkUser, checkTeacher, getMyHistoryTeacher);
// router.delete("/remove-history-teacher", checkUser, checkTeacher, removeHistoryTeacher);


// student
router.post("/create-activity", checkUser, createActivity);

router.put("/update-activity-progress/:id", checkUser, updateActivityProgress);
router.get("/get-activity-progress/:id", checkUser, getActivityProgress);

// we still have to add these API?
// router.get("/get-my-course-student", checkUser, getMyCourseStudent);
// router.get("/get-my-history-student", checkUser, getMyHistoryStudent);

module.exports = router;
