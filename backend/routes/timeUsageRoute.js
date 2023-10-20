const express = require('express')
const router = express.Router()

//middleware
const { checkUser } = require('../middleware/middleware')
const {
    updateTimeusage,
} = require('../controllers/timeUsageController')

router.put('/update-timeusage/:id', checkUser, updateTimeusage)

module.exports = router;