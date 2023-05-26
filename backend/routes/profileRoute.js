const express = require('express')
const router = express.Router()

//middleware
const { checkUser, checkTeacher, checkAdmin } = require('../middleware/middleware')
const {
    getProfileByUserId,
    updateProfile,
    // updateTarget,
} = require('../controllers/profileController')

// user
router.get("/get-profile/user/:id", checkUser, getProfileByUserId);
router.put("/update-profile/:id", checkUser, updateProfile);

// wait for review
// router.put("/update-target", checkUser, checkTeacher, updateTarget);

module.exports = router;