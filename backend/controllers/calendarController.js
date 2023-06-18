const Calendar = require("../models/calendar");
const Room = require("../models/room");
const Course = require("../models/course");
const Role = require("../models/role");
const User = require("../models/user");
const Activity = require("../models/activity");

exports.createCalendar = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findOne({ _id: id });

    const calendar = await new Calendar({
      start: req.body.start,
      end: req.body.end,
      color: req.body.color,
      title: course.name,
    }).save();

    await Course.findOneAndUpdate(
      { _id: id },
      { calendar: calendar._id },
      { new: true }
    );

    res.json(calendar);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error!!! on create calendar" });
  }
};
exports.updateCalendar = async (req, res) => {
  try {
    // console.log(req.params.id)
    const calendar = await Calendar.findOneAndUpdate(
      { _id: req.params.id },
      { start: req.body.start, end: req.body.end, color: req.body.color }
    );
    res.send(calendar);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! on list calendar");
  }
};

exports.listCalendar = async (req, res) => {
  try {
    const calendar = await Calendar.find();
    res.send(calendar);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! on list calendar ");
  }
};

exports.deleteCalendar = async (req, res) => {
  try {
    const course = await Course.findOneAndUpdate(
      { _id: req.params.id },
      { calendar: null }
    );
    const calendar = await Calendar.findOneAndDelete({ _id: course.calendar });
    res.send(calendar);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! on list calendar");
  }
};

// ===== Student ======
exports.listCalendarStudent = async (req, res) => {
  try {
    let calendar = [];
    const course = await Activity.find({ user: req.user.user_id })
      .populate({ path: "course", populate: { path: "calendar" } })
      .select("course");
    console.log("vvvv-----------------------------------")
    console.log(course)
    course.map((item) => {
      if (item?.course?.calendar) {
        calendar.push(item.course.calendar);
      }
    });

    res.send(calendar);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! on list calendar ");
  }
};
// exports.listCalendarRole = async (req, res) => {
//   try {
//     // const user = await User.find({ role : req.params.id }).select("_id")
//     // const Course = await Course.find({ teacher : req.params.id }).populate("teacher")
//     // res.send({ data: calendar });
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Server Error!!! on list calendar");
//   }
// };
// // exports.listCalendarUser = async (req, res) => {
// //     try {
// //         // const calendar = await Calendar.find({}).populate({
// //         //     path: "coursee",
// //         //     populate: {
// //         //         path: "room"
// //         //     },

// //         // })
// //         // res.send(calendar);

// //         // const calendar = await Coursee.find({user:req.user.user_id})
// //         // populate('calendar')
// //         // .exec()
// //         // console.log(calendar)
// //         res.send("ok")
// //     } catch (err) {
// //         console.log(err);
// //         res.status(500).send("Server Error!!! on list calendar");
// //     }
// // };
// exports.getCalendar = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const calendar = await Calendar.find({ coursee: id }).populate("coursee");
//     // console.log(req.params)
//     res.send(calendar);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Server Error!!! on list calendar");
//   }
// };
