// /create-condition

const express = require('express')
const router = express.Router()

const { checkUser, updateTimeUsage, checkTeacher } = require('../middleware/middleware')
const {
    deleteCondition,
    createCondition,
    listConditionCourse,
} = require('../controllers/conditionController')



// teacher
router.post("/create-condition/:id", checkUser, updateTimeUsage, checkTeacher, createCondition);
router.put("/remove-condition/:id", checkUser, updateTimeUsage, checkTeacher, deleteCondition);

// teacher && student
router.get("/list-condition/course/:id", checkUser, updateTimeUsage, listConditionCourse);



module.exports = router;