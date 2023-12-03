const express = require("express");
const router = express.Router();
const {
  checkUser, updateTimeUsage,
  checkAdmin,
  checkTeacher,
  uploadPublic,
  uploadPrivate,
} = require("../middleware/middleware");

const {
  createTopic,
  listTopic,
  deleteTopic,
  updateTopic,
  addTopicSub,
  removeTopicSub,
  updateTopicSub,
  addTopicLink,
  removeTopicLink,
  updateTopicLink,
  removeTopicFile
} = require("../controllers/topicController");

// teacher
router.post("/create-topic/:id", checkUser, updateTimeUsage, checkTeacher, createTopic); // error role แบบเดียวกับ condition

router.delete("/remove-topic/:id", checkUser, updateTimeUsage, checkTeacher, deleteTopic);
router.put("/update-topic/course/:id", checkUser, updateTimeUsage, checkTeacher, updateTopic);

router.put("/add-sub/topic/:id", checkUser, updateTimeUsage, checkTeacher, addTopicSub);
router.put("/remove-sub/topic/:id", checkUser, updateTimeUsage, checkTeacher, removeTopicSub);
router.put("/update-sub/topic/:id", checkUser, updateTimeUsage, checkTeacher, updateTopicSub);

router.put("/add-link/topic/:id", checkUser, updateTimeUsage, checkTeacher, addTopicLink);
router.put("/remove-link/topic/:id", checkUser, updateTimeUsage, checkTeacher, removeTopicLink);
router.put("/update-link/topic/:id", checkUser, updateTimeUsage, checkTeacher, updateTopicLink);

router.put("/remove-file/topic/:id", checkUser, updateTimeUsage, checkTeacher, removeTopicFile);

// teacher && student
router.get("/list-topic/course/:id", checkUser, updateTimeUsage, listTopic); // error role แบบเดียวกับ condition
module.exports = router;
