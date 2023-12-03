const express = require('express')
const router = express.Router()

//middleware
const { checkUser, updateTimeUsage, checkAdmin } = require('../middleware/middleware')
const {
    listUser,
    listUserRole,
    updateUserRole,
    updateUserEnabled,
    getUser,
    removeUser,
    updateUserPassword
} = require('../controllers/userController')

router.get('/list-user', checkUser, updateTimeUsage, checkAdmin, listUser)
router.get('/list-user/:role', checkUser, updateTimeUsage, checkAdmin, listUserRole)
router.get('/get-user/:id', checkUser, updateTimeUsage, getUser)

router.put('/update-user/:id/role', checkUser, updateTimeUsage, checkAdmin, updateUserRole)
router.put('/update-user/:id/enable', checkUser, updateTimeUsage, checkAdmin, updateUserEnabled)
router.put('/update-password/:id', checkUser, updateTimeUsage, checkAdmin, updateUserPassword)
router.delete('/remove-user/:id', checkUser, updateTimeUsage, checkAdmin, removeUser)
// router.put('/update-timeusage/:id', checkUser, updateTimeUsage, updateTimeusage)

module.exports = router;