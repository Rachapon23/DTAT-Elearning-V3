const express = require('express')
const router = express.Router()

//middleware
const { checkUser, checkTeacher, checkAdmin } = require('../middleware/middleware')
const {
    getProfile,
    updateProfile,
    // updateTarget,
} = require('../controllers/profileController')

// teacher
router.get("/get-profile/:id", checkUser, checkTeacher, getProfile);
router.put("/update-profile/:id", checkUser, checkTeacher, updateProfile);

// wait for review
// router.put("/update-target", checkUser, checkTeacher, updateTarget);

module.exports = router;