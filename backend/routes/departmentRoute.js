const express = require('express')
const router = express.Router()

//middleware
const { checkUser, checkAdmin } = require('../middleware/middleware')

//controller
const {
    listDepartment,
    createDepartment,
    removeDepartment,
} = require('../controllers/departmentController')


router.get('/list-department', checkUser, listDepartment)

// admin
router.post("/create-department", checkUser, checkAdmin, createDepartment);
router.delete("/remove-department/:id", checkUser, checkAdmin, removeDepartment);



module.exports = router;