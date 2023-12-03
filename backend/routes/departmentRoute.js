const express = require('express')
const router = express.Router()

//middleware
const { checkUser, updateTimeUsage, checkAdmin } = require('../middleware/middleware')

//controller
const {
    listDepartment,
    createDepartment,
    removeDepartment,
} = require('../controllers/departmentController')


router.get('/list-department', checkUser, updateTimeUsage, listDepartment)

// admin
router.post("/create-department", checkUser, updateTimeUsage, checkAdmin, createDepartment);
router.delete("/remove-department/:id", checkUser, updateTimeUsage, checkAdmin, removeDepartment);



module.exports = router;