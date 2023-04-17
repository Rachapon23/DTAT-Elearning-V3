const express = require('express')
const router = express.Router()

//middleware
const { checkUser, checkAdmin } = require('../middleware/middleware')
const {
    listUser,
    listUserRole,
    updateUserRole,
    updateUserEnabled,
} = require('../controllers/userController')

router.get('/list-user', checkUser, checkAdmin, listUser)
router.get('/list-user/:role', checkUser, checkAdmin, listUserRole)

router.put('/update-user/:id/role', checkUser, checkAdmin, updateUserRole)
router.put('/update-user/:id/enable', checkUser, checkAdmin, updateUserEnabled)

module.exports = router;