// /create-condition

const express = require('express')
const router = express.Router()

const { checkUser, checkTeacher } = require('../middleware/middleware')
const {
    deleteCondition,
    createCondition,
    listConditionCourse
} = require('../controllers/conditionController')



// teacher
router.post("/create-condition/:id",checkUser, checkTeacher, createCondition); // ได้
router.delete("/remove-condition/:id", deleteCondition); // no token
router.get("/list-condition/course/:id", checkUser, checkTeacher, listConditionCourse);




module.exports = router;