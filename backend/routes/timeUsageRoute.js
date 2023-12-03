const express = require('express')
const router = express.Router()

//middleware
const { checkUser, updateTimeUsage, checkAdmin } = require('../middleware/middleware')
const {
    updateTimeusageById, 
    listTimeusageByUser,
} = require('../controllers/timeUsageController')

router.get('/list-timeusage/user/:id', checkUser, updateTimeUsage, checkAdmin, listTimeusageByUser)
router.put('/update-timeusage/:id', checkUser, updateTimeUsage, updateTimeusageById)

module.exports = router;