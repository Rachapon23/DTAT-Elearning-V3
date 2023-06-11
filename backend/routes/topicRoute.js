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
router.post("/create-topic/:id", createTopic); // error role แบบเดียวกับ condition
router.get("/list-topic/course/:id", listTopic); // error role แบบเดียวกับ condition
router.delete("/remove-topic/:id", deleteTopic);
router.put("/update-topic/course/:id", updateTopic);

router.put("/add-sub/topic/:id", addTopicSub);
router.put("/remove-sub/topic/:id", removeTopicSub);
router.put("/update-sub/topic/:id", updateTopicSub);

router.put("/add-link/topic/:id", addTopicLink);
router.put("/remove-link/topic/:id", removeTopicLink);
router.put("/update-link/topic/:id", updateTopicLink);

router.put("/remove-file/topic/:id", removeTopicFile);

module.exports = router;
