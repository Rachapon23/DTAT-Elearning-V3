const Exam = require("../models/exam")
const { getCourse } = require("./course")
const { getQuiz } = require("./quiz")

let exam1
let exam2
let exam3
let exam4
let exam5

exports.loadExam = async () => {
    const {
        quiz11,
        quiz12,
        quiz13,
        quiz14,
        quiz21,
        quiz22,
        quiz23,
        quiz31,
        quiz32,
        quiz33,
        quiz41,
        quiz42,
        quiz43,
    } = await getQuiz()

    const {
        course1,
        course2,
        course3,
        course4,
        course5,
    } = await getCourse()


    await Exam.findOneAndDelete({ course: course1 })

    exam2 = await Exam.findOneAndUpdate(
        { name: "Introduction of Docker Final test" },
        {
            name: "Introduction of Docker Final test",
            detail: "Introduction of Docker Final test Detail ",
            teacher: await User.findOne({ employee: "6100319" }),
            quiz: [
                quiz11,
                quiz12,
                quiz13,
                quiz14,
            ],
            course: course2,
            enable: true,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    exam3 = await Exam.findOneAndUpdate(
        { name: "Basic of IoT Final test" },
        {
            name: "Basic of IoT Final test",
            detail: "Basic of IoT Final test Detail ",
            teacher: await User.findOne({ employee: "6100319" }),
            quiz: [
                quiz21,
                quiz22,
                quiz23,
            ],
            course: course3,
            enable: true,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    exam4 = await Exam.findOneAndUpdate(
        { name: "Arduino Final test" },
        {
            name: "Arduino Final test",
            detail: "Arduino Final test Detail ",
            teacher: await User.findOne({ employee: "6100999" }),
            quiz: [
                quiz31,
                quiz32,
                quiz33,
            ],
            course: course4,
            enable: true,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    exam5 = await Exam.findOneAndUpdate(
        { name: "Software Engineer Final test" },
        {
            name: "Software Engineer Final test",
            detail: "Software Engineer Final test Detail ",
            teacher: await User.findOne({ employee: "6100999" }),
            quiz: [
                quiz41,
                quiz42,
                quiz43,
            ],
            course: course5,
            enable: true,

        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
}

exports.getExam = async () => {
    return {
        exam1,
        exam2,
        exam3,
        exam4,
        exam5,
    }
}