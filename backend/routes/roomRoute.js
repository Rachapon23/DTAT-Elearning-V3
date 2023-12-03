const express = require('express')
const router = express.Router()

//middleware
const { checkUser, updateTimeUsage, checkTeacher, checkAdmin } = require('../middleware/middleware')

//controller
const {
    createRoom,
    removeRoom,
    listRoom,
} = require('../controllers/roomController')


// admin
router.post("/create-room", checkUser, updateTimeUsage, checkAdmin, createRoom);
router.delete("/remove-room/:id", checkUser, updateTimeUsage, checkAdmin, removeRoom);

// teacher
router.get("/list-room", checkUser, updateTimeUsage, checkTeacher, listRoom);

module.exports = router;