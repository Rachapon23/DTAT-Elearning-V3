const express = require('express')
const router = express.Router()

//middleware
const { checkUser, checkTeacher, uploadPrivate, uploadPublic } = require('../middleware/middleware')
const {
    createPrivateFile,
    getPrivateFieldImage,
} = require('../controllers/fileController')

// teacher
// privates
router.post("/create-file/:field", checkUser, checkTeacher, uploadPrivate, createPrivateFile);

// GET: /get-image/:field?id=<ID> | for fetch data to display, edit
// GET: /get-image/:field?file=<filename> | for fetch data in create process only
router.get("/get-image/:field", checkUser, checkTeacher, getPrivateFieldImage);
// router.use("/get-image", downloadPrivate);




module.exports = router;