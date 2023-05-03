const express = require('express')
const router = express.Router()

//middleware
const {checkUser, checkTeacher, uploadPrivate, uploadPublic } = require('../middleware/middleware')
const {
    createFile,
} = require('../controllers/fileController')

// teacher
router.post("/create-file/:field", checkUser, checkTeacher, uploadPrivate, createFile);
// router.post("/upload-file", checkUser, checkTeacher, uploadPrivate, uploadfile);


module.exports = router;