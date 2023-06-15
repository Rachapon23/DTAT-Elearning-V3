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
    deleteCalendar
} = require('../controllers/calendarController')


// all
// router.get("/list-calendar/role/:id", checkUser, checkTeacher, listCalendarRole);

// teacher
router.post("/create-calendar/course/:id", createCalendar);
router.get("/list-calendar", listCalendar);
router.put("/update-calendar/:id", updateCalendar);
router.delete("/delete-calendar/:id", deleteCalendar);

// student
router.get("/list-calendar-student", checkUser, listCalendarStudent);



module.exports = router;