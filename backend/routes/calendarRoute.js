// /create-calendar

const express = require('express')
const router = express.Router()

const { checkUser, checkTeacher } = require('../middleware/middleware')
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
// router.get("/list-calendar/role/:id", checkUser, checkTeacher, listCalendarRole);

// teacher
router.post("/create-calendar/course/:id", checkUser, checkTeacher, createCalendar);
router.get("/list-calendar", checkUser, checkTeacher, listCalendar);
router.put("/update-calendar/:id", checkUser, checkTeacher, updateCalendar);
router.delete("/delete-calendar/:id", checkUser, checkTeacher, deleteCalendar);

// student
router.get("/list-calendar-student", checkUser, listCalendarStudent);
router.get("/get-calendar/course/:id", checkUser, getCalendarByCourseId)



module.exports = router;