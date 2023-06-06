const express = require("express");
const router = express.Router();
const { checkUser, checkAdmin, checkTeacher, uploadPublic, uploadPrivate } = require('../middleware/middleware')

const {createTopic,listTopic,deleteTopic,updateTopic} = require('../controllers/topicController')


// teacher 
router.post("/create-topic/:id",  createTopic); // error role แบบเดียวกับ condition
router.get("/list-topic/course/:id",  listTopic); // error role แบบเดียวกับ condition
router.delete("/remove-topic/:id", deleteTopic); 
router.put("/update-topic/course/:id", updateTopic); 

module.exports = router