const Topic = require("../models/topic");
const Course = require("../models/course");
const fs = require("fs");

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
    switch (req?.user?.role) {
      case "admin":
      case "teacher":
        const topic = await Topic.find({ course: req.params.id });
        return res.json(topic);
      case "student":
        const courseStudent = await Course.findOne({ _id: req.params.id }, "enabled");
        if (courseStudent.enabled) {
          const topic = await Topic.find({ course: req.params.id });
          return res.json(topic);
        }
        return res.json({ enabled: false, message: "Course not avaliable" });
      default: return res.status(400).json({ error: "This role does not exsit in system" });
    }
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
    const { field, value } = req.body;
    if (field === "title") {
      const topic = await Topic.findOneAndUpdate(
        { _id: req.params.id },
        { title: value }
      );
      res.json(topic);
    } else if (field === "detail") {
      const topic = await Topic.findOneAndUpdate(
        { _id: req.params.id },
        { detail: value }
      );
      res.json(topic);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error!!! on update topic" });
  }
};
// PUT: add-sub-topic
exports.addTopicSub = async (req, res) => {
  try {
    const topic = await Topic.findOne({ _id: req.params.id });
    topic.sub_content.push("");

    await Topic.findOneAndUpdate(
      { _id: req.params.id },
      { sub_content: topic.sub_content }
    )

    res.json(topic);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error!!! on update topic" });
  }
};
// PUT: remove-sub-topic
exports.removeTopicSub = async (req, res) => {
  try {
    const topic = await Topic.findOne({ _id: req.params.id });
    topic.sub_content.splice(req.body.index, 1);
    await Topic.findOneAndUpdate(
      { _id: req.params.id },
      { sub_content: topic.sub_content }
    )

    res.json(topic);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error!!! on update topic" });
  }
};
// PUT: update-sub-topic
exports.updateTopicSub = async (req, res) => {
  try {
    const topic = await Topic.findOne({ _id: req.params.id });
    topic.sub_content[req.body.field] = req.body.value;
    await Topic.findOneAndUpdate(
      { _id: req.params.id },
      { sub_content: topic.sub_content }
    )

    res.json(topic);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error!!! on update topic" });
  }
};


// PUT: add-sub-topic
exports.addTopicLink = async (req, res) => {
  try {
    const topic = await Topic.findOne({ _id: req.params.id });
    topic.link.push({
      name: "",
      link: ""
    });

    await Topic.findOneAndUpdate(
      { _id: req.params.id },
      { link: topic.link }
    )

    res.json(topic);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error!!! on update topic" });
  }
};
// PUT: remove-sub-topic
exports.removeTopicLink = async (req, res) => {
  try {
    const topic = await Topic.findOne({ _id: req.params.id });
    topic.link.splice(req.body.index, 1);
    await Topic.findOneAndUpdate(
      { _id: req.params.id },
      { link: topic.link }
    )

    res.json(topic);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error!!! on update topic" });
  }
};
// PUT: update-link-topic
exports.updateTopicLink = async (req, res) => {
  try {
    const { field, value, index } = req.body
    const topic = await Topic.findOne({ _id: req.params.id });
    if (field === "fieldname") {
      topic.link[index].name = value
    } else if (field === "fieldlink") {
      topic.link[index].link = value
    }
    await Topic.findOneAndUpdate(
      { _id: req.params.id },
      { link: topic.link }
    )

    res.json(topic);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error!!! on update topic" });
  }
};

// PUT: remove-file-topic
exports.removeTopicFile = async (req, res) => {
  try {
    const { index } = req.body
    const topic = await Topic.findOne({ _id: req.params.id });

    fs.unlink(`./private/uploads/topic/${topic.file[index].name}`, (err) => {
      if (err) {
        console.log(err);
        error_deleteFile = true;
      }
    });
    topic.file.splice(index, 1);
    await Topic.findOneAndUpdate(
      { _id: req.params.id },
      { file: topic.file }
    )

    res.json(topic);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error!!! on update topic" });
  }
};