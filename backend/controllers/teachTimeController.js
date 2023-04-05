const User = require('../models/userModel')
const TeachDate = require("../models/teachDateModel")

exports.createTeachTime = async (req, res) => {
    try {
        const {
            course,
            start,
            end,
            teacher,
        } = req.body;

        console.log(req.body)

        TeachDate.create({ course, start, start, end, teacher }, (err, teachTime) => {
            if (err) {
                return res.status(500).json({ error: "fail to create the teach time" });
            }
            res.json(teachTime);
        })
    }
    catch (err) {
        console.log("fail to create the teach time");
        res.status(500).json({ error: "fail to create the teach time" })
    }
}

exports.listTeachTimes = async (req, res) => {
    try {
        await TeachDate.find({}).exec((err, teachTime) => {
            // console.log(teachTime)
            res.json(teachTime);
        });

    }
    catch (err) {
        console.log("fail to fetch teach time");
        res.status(500).json({ error: "fail to fetch teach time" });
    }
}

exports.listCoursesInTeachTime = async (req, res) => {
    try {

        const {time, user_id} = req.body
        // console.log(req.body)
        
        const teachTimes = await TeachDate.find({}).populate("course teacher").exec()
        
        const payload = []
        teachTimes.forEach((teachTime) => {
            console.log("start--------------------")
            console.log(teachTime)
            
            if(new Date(time).getFullYear() >= new Date(teachTime.start).getFullYear() && new Date(time).getFullYear() <= new Date(teachTime.start).getFullYear()) {
                // console.log(teachTime.start)
                if(new Date(time).getMonth()>= new Date(teachTime.start).getMonth() && new Date(time).getMonth() <= new Date(teachTime.end).getMonth()) {
                    if(new Date(time).getDate()>= new Date(teachTime.start).getDate() && new Date(time).getDate() <= new Date(teachTime.end).getDate()) {
                        // console.log(teachTime)
                        payload.push(teachTime)
                    }
                }
            }
            console.log("end--------------------")
            
        })
        
        // console.log(payload)
        res.json(payload);
    }
    catch (err) {
        console.log("fail to fetch teach time");
        console.log(err);
        res.status(500).json({ error: "fail to fetch teach time" });
    }
}