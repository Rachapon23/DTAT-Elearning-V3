const Topic = require("../models/topic");
const Course = require("../models/course");

// POST: /create-content
exports.createTopic = async (req, res) => {
  try {
    const topic = await new Topic({
      course: req.params.id,
    }).save();

    res.json(topic);
  } catch (err) {
    console.log("fail to create the content : ", err);
    res.status(500).json({ error: "Unexpected error on create Topic" });
  }
};

// GET: /list-topic
exports.listTopic = async (req, res) => {
  try {
    const topic = await Topic.find({ course: req.params.id });
    res.json(topic);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unexpected error on list topic" });
  }
};

// DELETE: delete-topic
exports.deleteTopic = async (req, res) => {
  try {
    const topic = await Topic.findOneAndDelete({ _id: req.params.id });
    res.json(topic);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error!!! on delete topic" });
  }
};
// PUT: update-topic
exports.updateTopic = async (req, res) => {
  try {
    const arrIDtopicNew = [];
    const arrIDtopicOld = [];

    const topicReq = req.body;
    const topic = await Topic.find({ course: req.params.id });

    // Update
    await topicReq.map(async (item, index) => {
      await topic.map(async (Ttem, Tdex) => {
        if (item._id == Ttem._id) {
          arrIDtopicNew.push(item._id);
          const topic_update = await Topic.findOneAndUpdate(
            { _id: item._id },
            {
              title: item.title,
              detail: item.detail,
              link: item.link,
              file: item.file,
              sub_content: item.sub_content,
            },
            { new: true }
          );
        }
      });
    });

    // Delete
    await topic.map(async (item, index) => {
      arrIDtopicOld.push(item._id);
    });

    for (var i = 0; i < arrIDtopicOld.length; i++) {
      for (var j = 0; j < arrIDtopicNew.length; j++) {
        if (arrIDtopicOld[i] == arrIDtopicNew[j]) {
          arrIDtopicOld.splice(i, 1);
        }
      }
    }
    await Topic.deleteMany({ _id: { $in: arrIDtopicOld } });
    res.json("Process Success");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error!!! on update topic" });
  }
};
