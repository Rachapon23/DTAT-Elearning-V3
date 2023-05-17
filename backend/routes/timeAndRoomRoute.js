const express = require('express')
const router = express.Router()

//middleware
const { checkUser, checkAdmin } = require('../middleware/middleware')
const {timeAndRoom
} = require('../controllers/timeAndRoomController')

router.post('/create-timeandroom/course/:id', checkUser, checkAdmin, timeAndRoom)


module.exports = router;