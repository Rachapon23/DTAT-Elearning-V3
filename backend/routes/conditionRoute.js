// /create-condition

const express = require('express')
const router = express.Router()

const { checkUser, checkTeacher } = require('../middleware/middleware')
const {
    deleteCondition,
    createCondition,
    listCondition,
} = require('../controllers/conditionController')



// teacher
router.post("/create-condition/:id", checkUser, checkTeacher, createCondition);
router.put("/remove-condition/:id", checkUser, checkTeacher, deleteCondition);




module.exports = router;