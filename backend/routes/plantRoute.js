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

// non-system-user
router.get("/list-plant", listPlant);

// admin
router.post("/create-plant", checkUser, checkAdmin, createPlant);
router.delete("/remove-plant/:id", checkUser, checkAdmin, removePlant);

module.exports = router;