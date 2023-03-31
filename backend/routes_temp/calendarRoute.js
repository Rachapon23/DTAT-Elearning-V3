// /create-calendar

const express = require('express')
const router = express.Router()

const { checkUser, checkTeacher } = require('../middleware/middleware')
const {
    xxxx,
} = require('../controllers/')



// teacher
router.post("/create-calendar", createCalendar);
router.put("/update-calendar/:id", updateCalendar);
router.get("/list-calendar-teacher", checkUser, checkTeacher, listCalendarTeacher);


// student
router.get("/get-calendar-course", checkUser, listCalendarCourse);
router.get("/list-calendar-student", checkUser, listCalendarStudent);


module.exports = router;