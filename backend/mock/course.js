const Course = require("../models/course");
const { getUser } = require("./user");

let course1
let course2
let course3
let course4
let course5
let course6
let course7
let course8
let course9
let course10

exports.loadCourse = async () => {
    const {
        admin1,
        teacher1,
    } = await getUser()


    course1 = await Course.findOneAndUpdate(
        { name: "Basic of Data struture and Algorithm", },
        {
            name: "Basic of Data struture and Algorithm",
            detail: "Basic of Data struture and Algorithm Detail",
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
            type: true,
            enabled: true,
            teacher: admin1,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    course4 = await Course.findOneAndUpdate(
        { name: "Introduction of Arduino" },
        {
            name: "Introduction of Arduino",
            detail: "Introduction of Arduino Detail ",
            room: await Room.findOne({ name: "Technical Skill 1" }).select("_id"),
            image: null,
            video: 2,
            type: true,
            enabled: false,
            teacher: teacher1,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    course5 = await Course.findOneAndUpdate(
        { name: "Basic of Software Engineer" },
        {
            name: "Basic of Software Engineer",
            detail: "Basic of Software Engineer Detail ",
            room: await Room.findOne({ name: "Technical Skill 5" }).select("_id"),
            image: null,
            video: 2,
            type: true,
            enabled: true,
            teacher: teacher1,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    course6 = await Course.findOneAndUpdate(
        { name: "Advance Data struture and Algorithm" },
        {
            name: "Advance Data struture and Algorithm",
            detail: "Advance Data struture and Algorithm Detail ",
            room: await Room.findOne({ name: "Technical Skill 5" }).select("_id"),
            image: null,
            video: 2,
            type: false, // true
            enabled: true,
            teacher: teacher1,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    course7 = await Course.findOneAndUpdate(
        { name: "Advance Software Engineer" },
        {
            name: "Advance Software Engineer",
            detail: "Advance Software Engineer Detail ",
            room: await Room.findOne({ name: "Technical Skill 5" }).select("_id"),
            image: null,
            video: 2,
            type: false, // true
            enabled: true,
            teacher: teacher1,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    course8 = await Course.findOneAndUpdate(
        { name: "Advance Docker" },
        {
            name: "Advance Docker",
            detail: "Advance Docker Detail",
            room: await Room.findOne({ name: "Technical Skill 2" }).select("_id"),
            image: null,
            video: 2,
            type: false,
            enabled: true,
            teacher: admin1,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    course9 = await Course.findOneAndUpdate(
        { name: "Advance IoT" },
        {
            name: "Advance IoT",
            detail: "Advance IoT Detail ",
            room: await Room.findOne({ name: "Technical Skill 1" }).select("_id"),
            image: null,
            video: 2,
            type: false,
            enabled: true,
            teacher: admin1,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    course10 = await Course.findOneAndUpdate(
        { name: "Advance Arduino" },
        {
            name: "Advance Arduino",
            detail: "Advance Arduino Detail ",
            room: await Room.findOne({ name: "Technical Skill 1" }).select("_id"),
            image: null,
            video: 2,
            type: false,
            enabled: false,
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
        course6,
        course7,
        course8,
        course9,
        course10,
    }
}