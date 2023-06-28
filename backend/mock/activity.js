const Activity = require("../models/activity");
const { getCourse } = require("./course");
const { getUser } = require("./user");

let activity1
let activity2
let activity3
let activity4
let activity5
let activity6
let activity7

exports.loadActivity = async () => {

    const {
        course1,
        course2,
        course3,
        course4,
        course5,
    } = await getCourse()

    const {
        admin1,
        student1,
        student2
    } = await getUser()

    activity1 = await Activity.findOneAndUpdate(
        { course: course1 },
        {
            ans: null,
            progress: 0,
            completed: false,
            result: 0,
            score_max: null,
            score_value: null,
            user: student1,
            course: course1,

        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    activity2 = await Activity.findOneAndUpdate(
        { course: course2 },
        {
            ans: null,
            progress: 0,
            completed: false,
            result: 0,
            score_max: null,
            score_value: null,
            user: admin1,
            course: course2,

        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    activity3 = await Activity.findOneAndUpdate(
        { course: course3 },
        {
            ans: null,
            progress: 0,
            completed: false,
            result: 0,
            score_max: null,
            score_value: null,
            user: student1,
            course: course3,

        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    activity4 = await Activity.findOneAndUpdate(
        { course: course4 },
        {
            ans: null,
            progress: 0,
            completed: false,
            result: 0,
            score_max: null,
            score_value: null,
            user: student1,
            course: course4,

        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    activity5 = await Activity.findOneAndUpdate(
        { course: course5 },
        {
            ans: null,
            progress: 0,
            completed: false,
            result: 0,
            score_max: null,
            score_value: null,
            user: student1,
            course: course5,

        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    activity6 = await Activity.findOneAndUpdate(
        { course: course2, user: student2 },
        {
            ans: null,
            progress: 0,
            completed: false,
            result: 0,
            score_max: null,
            score_value: null,
            user: student2,
            course: course2,

        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    activity7 = await Activity.findOneAndUpdate(
        { course: course3, user: student2 },
        {
            ans: null,
            progress: 0,
            completed: false,
            result: 0,
            score_max: null,
            score_value: null,
            user: student2,
            course: course3,

        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
}

exports.getActivity = () => {
    return {
        activity1,
        activity2,
        activity3,
        activity4,
        activity5,
        activity6,
        activity7,
    }
}