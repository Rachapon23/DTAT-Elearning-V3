
const Calendar = require('../models/calendar')
const Room = require('../models/room')
const Course = require("../models/course");
const Role = require("../models/role")
const User = require("../models/user")

exports.createCalendar = async (req, res) => {
    try {
        const calendar = await new Calendar({
            start: req.body.start,
            end: req.body.end,
            color: req.body.color,
        }).save()

        const course = await Course.findOneAndUpdate(
            { _id: req.params.id },
            { calendar: calendar },
            { new: true },
        )

        res.json({ data: { calendar, course } });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server Error!!! on create calendar" });
    }
};

exports.listCalendarRole = async (req, res) => {
    try {
        // const user = await User.find({ role : req.params.id }).select("_id")
        // const Course = await Course.find({ teacher : req.params.id }).populate("teacher")

        // res.send({ data: calendar });
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!!! on list calendar");
    }
};
// exports.listCalendarUser = async (req, res) => {
//     try {
//         // const calendar = await Calendar.find({}).populate({
//         //     path: "coursee",
//         //     populate: {
//         //         path: "room"
//         //     },

//         // })
//         // res.send(calendar);

//         // const calendar = await Coursee.find({user:req.user.user_id})
//         // populate('calendar')
//         // .exec()
//         // console.log(calendar)
//         res.send("ok")
//     } catch (err) {
//         console.log(err);
//         res.status(500).send("Server Error!!! on list calendar");
//     }
// };
exports.getCalendar = async (req, res) => {
    try {
        const { id } = req.params
        const calendar = await Calendar.find({ coursee: id }).populate("coursee")
        // console.log(req.params)
        res.send(calendar);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!!! on list calendar");
    }
};

exports.updateCalendar = async (req, res) => {
    try {

        // console.log(req.body)
        const calendar = await Calendar.findOneAndUpdate(
            { coursee: req.body.id },
            { start: req.body.start, end: req.body.end, color: req.body.color }
        )
        // console.log(calendar)
        res.send(calendar);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!!! on list calendar");
    }
};

exports.deleteCalendar = async (req, res) => {
    try {

        const course = await Calendar.findOne(
            { _id: req.params.id }).populate("coursee").select("coursee")
        if (req.user.role == 'admin') {
            const calendar = await Calendar.findOneAndDelete(
                { _id: req.params.id })
            res.send(calendar);
        } else {
            if (req.user.user_id == course.coursee.teacher) {
                const calendar = await Calendar.findOneAndDelete(
                    { _id: req.params.id })
                res.send(calendar);
            } else {
                res.status(400).send("you have no rights")
            }
        }


        // console.log(req.params.id)
        // res.send("calendar");
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!!! on list calendar");
    }
};