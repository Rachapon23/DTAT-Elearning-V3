const express = require('express')
const router = express.Router()

//middleware
const { checkUser, checkTeacher, checkAdmin } = require('../middleware/middleware')

//controller
const {
    createPlant,
    removePlant,
    listPlant,
} = require('../controllers/plantController')

// admin
router.post("/create-plant", checkUser, checkAdmin, createPlant);
router.delete("/remove-plant/:id", checkUser, checkAdmin, removePlant);

// teacher
router.get("/list-plant", checkUser, checkTeacher, listPlant);

module.exports = router;