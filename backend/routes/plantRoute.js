const express = require('express')
const router = express.Router()

//middleware
const { checkUser, updateTimeUsage, checkTeacher, checkAdmin } = require('../middleware/middleware')

//controller
const {
    createPlant,
    removePlant,
    listPlant,
    listPlantNoDuplicate,
} = require('../controllers/plantController')

router.get("/list-plant", checkUser, updateTimeUsage, listPlant);
router.get("/list-plant/sp/no-duplicate", checkUser, updateTimeUsage, checkTeacher, listPlantNoDuplicate);

// admin
router.post("/create-plant", checkUser, updateTimeUsage, checkAdmin, createPlant);
router.delete("/remove-plant/:id", checkUser, updateTimeUsage, checkAdmin, removePlant);

module.exports = router;