// /create-calendar

const express = require('express')
const router = express.Router()

const { checkUser, updateTimeUsage, checkTeacher } = require('../middleware/middleware')
const {
    createCalendar,
    // listCalendarRole,
    listCalendarStudent,
    updateCalendar,
    listCalendar,
    deleteCalendar,
    getCalendarByCourseId
} = require('../controllers/calendarController')


// all
// router.get("/list-calendar/role/:id", checkUser, updateTimeUsage, checkTeacher, listCalendarRole);

// teacher
router.post("/create-calendar/course/:id", checkUser, updateTimeUsage, checkTeacher, createCalendar);
router.get("/list-calendar", checkUser, updateTimeUsage, checkTeacher, listCalendar);
router.put("/update-calendar/:id", checkUser, updateTimeUsage, checkTeacher, updateCalendar);
router.delete("/delete-calendar/:id", checkUser, updateTimeUsage, checkTeacher, deleteCalendar);

// student
router.get("/list-calendar-student", checkUser, updateTimeUsage, listCalendarStudent);
router.get("/get-calendar/course/:id", checkUser, updateTimeUsage, getCalendarByCourseId)



module.exports = router;