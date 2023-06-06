const condition = require("../models/condition");
const Condition = require("../models/condition");
const Course = require("../models/course");

// POST: create-condition
exports.createCondition = async (req, res) => {
  try {
    const condition = await new Condition({
      plant: req.body.plant,
      maximum: req.body.maximum,
      course:req.params.id
    }).save();
    res.json(condition);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error!!! on create condition" });
  }
};

// GET: /list-condition/course/:id
exports.listConditionCourse = async (req, res) => {
  try {
    const condition = await Condition.find({ course: req.params.id })
    .populate('plant')
    res.json(condition);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error!!! on create condition" });
  }
};
// DELETE: delete-condition
exports.deleteCondition = async (req, res) => {
  try {
    const condition = await Condition.findOneAndDelete({_id:req.params.id})
    res.json(condition);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error!!! on create condition" });
  }
};
