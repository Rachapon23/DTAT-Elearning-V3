
const express = require('express')
const router = express.Router()
const { checkUser, checkTeacher, checkAdmin } = require('../middleware/middleware')
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
router.get("/list-activity/course/:id", checkUser, checkTeacher, listActivityCourse);

// we still have to add these API?
// router.get("/get-my-history-teacher", checkUser, checkTeacher, getMyHistoryTeacher);
// router.delete("/remove-history-teacher", checkUser, checkTeacher, removeHistoryTeacher);


// student
router.post("/create-activity", checkUser, createActivity);

router.put("/update-activity/:id/progress", checkUser, updateActivityProgress);
router.get("/get-activity/:id/progress", checkUser, getActivityProgress);

router.put("/update-activity/:id/score", checkUser, updateActivityScore);
router.get("/get-activity/:id/score", checkUser, getActivityScore);

router.get("/list-activity", checkUser, listActivity);

router.put("/update-activity/:id/send-exam", checkUser, sendExam)

router.put("/update-activity/:id/result", checkUser, checkTeacher, updateActivityResult)


// we still have to add these API?
// router.get("/get-my-course-student", checkUser, getMyCourseStudent);
// router.get("/get-my-history-student", checkUser, getMyHistoryStudent);


// new api pattern check role in controller
router.get("/get-activity/:id", checkUser, getActivity);
router.get("/get-activity", checkUser, getActivity);

module.exports = router;
