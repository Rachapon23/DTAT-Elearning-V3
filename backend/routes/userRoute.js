const express = require('express')
const router = express.Router()

//middleware
const { checkUser, checkAdmin } = require('../middleware/middleware')
const {
    listUser,
    listUserRole,
    updateUserRole,
    updateUserEnabled,
    getUser,
    removeUser
} = require('../controllers/userController')

router.get('/list-user', checkUser, checkAdmin, listUser)
router.get('/list-user/:role', checkUser, checkAdmin, listUserRole)
router.get('/get-user/:id', checkUser, getUser)

router.put('/update-user/:id/role', checkUser, checkAdmin, updateUserRole)
router.put('/update-user/:id/enable', checkUser, checkAdmin, updateUserEnabled)
router.delete('/remove-user/:id', checkUser, checkAdmin, removeUser)
// router.put('/update-timeusage/:id', checkUser, updateTimeusage)

module.exports = router;