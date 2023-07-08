const express = require("express");
const router = express.Router();
const {
  checkUser,
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
router.post("/create-topic/:id", checkUser, checkTeacher, createTopic); // error role แบบเดียวกับ condition

router.delete("/remove-topic/:id", checkUser, checkTeacher, deleteTopic);
router.put("/update-topic/course/:id", checkUser, checkTeacher, updateTopic);

router.put("/add-sub/topic/:id", checkUser, checkTeacher, addTopicSub);
router.put("/remove-sub/topic/:id", checkUser, checkTeacher, removeTopicSub);
router.put("/update-sub/topic/:id", checkUser, checkTeacher, updateTopicSub);

router.put("/add-link/topic/:id", checkUser, checkTeacher, addTopicLink);
router.put("/remove-link/topic/:id", checkUser, checkTeacher, removeTopicLink);
router.put("/update-link/topic/:id", checkUser, checkTeacher, updateTopicLink);

router.put("/remove-file/topic/:id", checkUser, checkTeacher, removeTopicFile);

// teacher && student
router.get("/list-topic/course/:id", checkUser, listTopic); // error role แบบเดียวกับ condition
module.exports = router;
