const express = require('express')
const router = express.Router()

//middleware
const { checkUser, updateTimeUsage, checkTeacher, checkAdmin } = require('../middleware/middleware')
const {
    getProfileByUserId,
    updateProfile,
    // updateTarget,
} = require('../controllers/profileController')

// user
router.get("/get-profile/user/:id", checkUser, updateTimeUsage, getProfileByUserId);
router.put("/update-profile/:id", checkUser, updateTimeUsage, updateProfile);

// wait for review
// router.put("/update-target", checkUser, updateTimeUsage, checkTeacher, updateTarget);

module.exports = router;