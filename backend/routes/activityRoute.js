
const express = require('express')
const router = express.Router()
const { checkUser, updateTimeUsage, checkTeacher, checkAdmin } = require('../middleware/middleware')
const {
    createActivity,
    listActivityCourse,
    updateActivityProgress,
    getActivityProgress,
    updateActivityScore,
    getActivityScore,
    getActivity,
    listActivity,
    sendExam,
    updateActivityResult
} = require('../controllers/activityController')

// teacher
router.get("/list-activity/course/:id", checkUser, updateTimeUsage, checkTeacher, listActivityCourse);

// we still have to add these API?
// router.get("/get-my-history-teacher", checkUser, updateTimeUsage, checkTeacher, getMyHistoryTeacher);
// router.delete("/remove-history-teacher", checkUser, updateTimeUsage, checkTeacher, removeHistoryTeacher);


// student
router.post("/create-activity", checkUser, updateTimeUsage, createActivity);

router.put("/update-activity/:id/progress", checkUser, updateTimeUsage, updateActivityProgress);
router.get("/get-activity/:id/progress", checkUser, updateTimeUsage, getActivityProgress);

router.put("/update-activity/:id/score", checkUser, updateTimeUsage, updateActivityScore);
router.get("/get-activity/:id/score", checkUser, updateTimeUsage, getActivityScore);

router.get("/list-activity", checkUser, updateTimeUsage, listActivity);

router.put("/update-activity/:id/send-exam", checkUser, updateTimeUsage, sendExam)

router.put("/update-activity/:id/result", checkUser, updateTimeUsage, checkTeacher, updateActivityResult)


// we still have to add these API?
// router.get("/get-my-course-student", checkUser, updateTimeUsage, getMyCourseStudent);
// router.get("/get-my-history-student", checkUser, updateTimeUsage, getMyHistoryStudent);


// new api pattern check role in controller
router.get("/get-activity/:id", checkUser, updateTimeUsage, getActivity);
router.get("/get-activity", checkUser, updateTimeUsage, getActivity);

module.exports = router;
