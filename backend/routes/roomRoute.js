const express = require('express')
const router = express.Router()

//middleware
const { checkUser, checkTeacher, checkAdmin } = require('../middleware/middleware')

//controller
const {
    createRoom,
    removeRoom,
    listRoom,
} = require('../controllers/roomController')


// admin
router.post("/create-room", checkUser, checkAdmin, createRoom);
router.delete("/remove-room/:id", checkUser, checkAdmin, removeRoom);

// teacher
router.get("/list-room", checkUser, checkTeacher, listRoom);

module.exports = router;