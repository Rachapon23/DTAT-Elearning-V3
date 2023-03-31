
const Calendar = require('../models/calendar')
const layout = require('../models/layout')
const Coursee = require("../models/course");
const { populate } = require('../models/calendar');

exports.createCalendar = async (req, res) => {
    try {
        const calendar = await new Calendar(req.body.values).save()
        //    console.log(req.body.values)
        const course = await Coursee.findOneAndUpdate(
            {_id:req.body.values.coursee},
            {calendar:[
                {
                    start:req.body.values.start,
                    end:req.body.values.end,
                    color:req.body.values.color,
                    idcalendar:req.body.values.coursee
                }
            ]}
        )
        .exec()
        res.send(calendar);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!!! on create calendar");
    }
};

exports.listCalendar = async (req, res) => {
    try {
        const calendar = await Calendar.find({}).populate({
            path: "coursee",
            populate: {
                path: "room"
            },

        })
        res.send(calendar);
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
        const {id} = req.params
        const calendar = await Calendar.find({coursee:id}).populate("coursee")
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
            { start: req.body.start, end: req.body.end ,color:req.body.color}
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