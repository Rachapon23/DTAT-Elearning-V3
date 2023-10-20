const express = require('express')
const router = express.Router()

//middleware
const { checkUser, checkTeacher, checkAdmin } = require('../middleware/middleware')

//controller
const {
    createPlant,
    removePlant,
    listPlant,
    listPlantNoDuplicate,
} = require('../controllers/plantController')

router.get("/list-plant", checkUser, listPlant);
router.get("/list-plant/sp/no-duplicate", checkUser, checkTeacher, listPlantNoDuplicate);

// admin
router.post("/create-plant", checkUser, checkAdmin, createPlant);
router.delete("/remove-plant/:id", checkUser, checkAdmin, removePlant);

module.exports = router;