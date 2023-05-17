const Calendar = require("../models/calendar");
const Room = require("../models/room");
const Course = require("../models/course");

exports.timeAndRoom = async (req, res) => {
  try {
    const { start, end, color, room } = req.body;
    const { id } = req.params;
    const calendar = await new Calendar({
      start: req.body.start,
      end: req.body.end,
      color: req.body.color,
    }).save();

    const course = await Course.findOneAndUpdate(
      { _id: id },
      { calendar: calendar._id, room: room },
      { new: true }
    );

    res.json({ data: course });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error!!! on create time and Room" });
  }
};
