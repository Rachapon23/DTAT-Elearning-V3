const express = require('express')
const router = express.Router()

//middleware
const { checkUser, checkTeacher, uploadPrivate, uploadPublic } = require('../middleware/middleware')
const {
    createPrivateFile,
    createPublicFile,
    getPrivateFieldImage,
    getPublicFieldImage,
    deleteImageCourse
} = require('../controllers/fileController')

// teacher
// privates
router.post("/create-file/private/:field", checkUser, checkTeacher, uploadPrivate, createPrivateFile);
// GET: /get-image/private/:field?id=<ID> | for fetch data to display, edit
// GET: /get-image/private/:field?file=<filename> | for fetch data in create process only
router.get("/get-image/private/:field", checkUser, checkTeacher, getPrivateFieldImage);
router.delete("/delete-file/course/:id", checkUser, checkTeacher, deleteImageCourse);

// admin
// public
router.post("/create-file/public/:field", checkUser, checkTeacher, uploadPublic, createPublicFile);

// GET: /get-image/public/:field?id=<ID> | for fetch data to display, edit
// GET: /get-image/public/:field?file=<filename> | for fetch data in create process only
// router.get("/get-image/public/:field", checkUser, checkTeacher, getPublicFieldImage);






module.exports = router;