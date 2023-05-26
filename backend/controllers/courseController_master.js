const User = require("../models/user");
const Calendar = require("../models/calendar");
const Room = require("../models/room");
const Course = require("../models/course");

// PUT: /update-course-info/:id
exports.updateCourseInfo = async (req, res) => {
  try {
    const course = await Course.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        detail: req.body.detail,
        type: req.body.type,
      },
      { new: true }
    );

    res.json({ data: course });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unexpected error on update course info" });
  }
};

exports.updateCoursetimeAndRoom = async (req, res) => {
  try {
    const { start, end, color, room } = req.body;
    const { id } = req.params;

    const course = await Course.findOne({ _id: id }).populate("calendar");

    if (!!course.calendar) {
      const calendarUpdate = await Calendar.findOneAndUpdate(
        { _id: course.calendar._id },
        {
          start: req.body.start,
          end: req.body.end,
          color: req.body.color,
          title: course.name,
        },
        { new: true }
      );
      // console.log("Updatat: ",calendarUpdate)
      res.json({ data: calendarUpdate });
    } else {
      const calendar = await new Calendar({
        start: req.body.start,
        end: req.body.end,
        color: req.body.color,
        title: course.name,
      }).save();
      const courseUpdate = await Course.findOneAndUpdate(
        { _id: id },
        { calendar: calendar._id, room: room },
        { new: true }
      );
      res.json({ data: courseUpdate });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unexpected error on update course time and room" });
  }
};
