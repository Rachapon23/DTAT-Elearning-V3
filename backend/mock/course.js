const Course = require("../models/course");
const { getUser } = require("./user");

let course1
let course2
let course3
let course4
let course5

exports.loadCourse = async () => {
    const {
        admin1,
        teacher1,
    } = await getUser()


    course1 = await Course.findOneAndUpdate(
        { name: "Data struture and Algorithm", },
        {
            name: "Data struture and Algorithm",
            detail: "Data struture and Algorithm Detail",
            room: await Room.findOne({ name: "Technical Skill 3" }).select("_id"),
            image: null,
            video: 2,
            type: true,
            enabled: true,
            teacher: admin1,
            exam: null,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    course2 = await Course.findOneAndUpdate(
        { name: "Introduction of Docker" },
        {
            name: "Introduction of Docker",
            detail: "Introduction of Docker Detail ",
            room: await Room.findOne({ name: "Technical Skill 2" }).select("_id"),
            image: {
                original_name: "course-pic1",
                name: "file-1686314592046-712090448.jpg",
                url: `/course/file-1686314592046-712090448.jpg`,
            },
            video: 2,
            type: true,
            enabled: true,
            teacher: admin1,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    course3 = await Course.findOneAndUpdate(
        { name: "Basic of IoT" },
        {
            name: "Basic of IoT",
            detail: "Basic of IoT Detail ",
            room: await Room.findOne({ name: "Technical Skill 1" }).select("_id"),
            image: null,
            video: 2,
            type: false,
            enabled: true,
            teacher: admin1,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    course4 = await Course.findOneAndUpdate(
        { name: "Arduino" },
        {
            name: "Arduino",
            detail: "Arduino Detail ",
            room: await Room.findOne({ name: "Technical Skill 1" }).select("_id"),
            image: null,
            video: 2,
            type: true,//false,
            enabled: false,
            teacher: teacher1,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    course5 = await Course.findOneAndUpdate(
        { name: "Software Engineer" },
        {
            name: "Software Engineer",
            detail: "Software Engineer Detail ",
            room: await Room.findOne({ name: "Technical Skill 5" }).select("_id"),
            image: null,
            video: 2,
            type: true,//false,
            enabled: true,
            teacher: teacher1,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
}

exports.getCourse = async () => {
    return {
        course1,
        course2,
        course3,
        course4,
        course5,
    }
}