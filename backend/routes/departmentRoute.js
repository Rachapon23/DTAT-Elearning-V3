const express = require('express')
const router = express.Router()

//middleware
const { checkUser } = require('../middleware/middleware')

//controller
const {
    listDepartment,
} = require('../controllers/departmentController')


// register
router.get('/list-department', listDepartment)



module.exports = router;