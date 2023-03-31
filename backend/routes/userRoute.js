const express = require('express')
const router = express.Router()

//middleware
const { checkUser, checkAdmin } = require('../middleware/middleware')
const {
    listUser,
    listStudent,
    listTeacher,
    changeRole,
    changeEnable,
} = require('../controllers/userController')

router.get('/list-user', checkUser, checkAdmin, listUser)
router.get('/list-student', checkUser, checkAdmin, listStudent)
router.get('/list-teacher', checkUser, checkAdmin, listTeacher)

router.put('/change-role', checkUser, checkAdmin, changeRole)
router.put('/change-enable', checkUser, checkAdmin, changeEnable)

module.exports = router;