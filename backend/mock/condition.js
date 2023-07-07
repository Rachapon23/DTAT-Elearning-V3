const Condition = require("../models/condition");
const { getCourse } = require("./course")

let condition61
let condition62
let condition71
let condition72
let condition81
let condition91
let condition101
let condition102

exports.loadCondition = async () => {
    const {
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
    } = await getCourse()


    condition61 = await Condition.findOneAndUpdate(
        { course: course6, plant: await Plant.findOne({ name: "A" }).select("_id") },
        {
            plant: await Plant.findOne({ name: "A" }).select("_id"),
            maximum: 1,
            course: course6,
            current: 0,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    condition62 = await Condition.findOneAndUpdate(
        { course: course6, plant: await Plant.findOne({ name: "B" }).select("_id") },
        {
            plant: await Plant.findOne({ name: "B" }).select("_id"),
            maximum: 1,
            course: course6,
            current: 0,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    condition71 = await Condition.findOneAndUpdate(
        { course: course7, plant: await Plant.findOne({ name: "A" }).select("_id") },
        {
            plant: await Plant.findOne({ name: "A" }).select("_id"),
            maximum: 1,
            course: course7,
            current: 0,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    condition72 = await Condition.findOneAndUpdate(
        { course: course7, plant: await Plant.findOne({ name: "B" }).select("_id") },
        {
            plant: await Plant.findOne({ name: "B" }).select("_id"),
            maximum: 1,
            course: course7,
            current: 0,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )


    condition81 = await Condition.findOneAndUpdate(
        { course: course8, plant: await Plant.findOne({ name: "A" }).select("_id") },
        {
            plant: await Plant.findOne({ name: "A" }).select("_id"),
            maximum: 1,
            course: course8,
            current: 1,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )


    condition91 = await Condition.findOneAndUpdate(
        { course: course9, plant: await Plant.findOne({ name: "B" }).select("_id") },
        {
            plant: await Plant.findOne({ name: "B" }).select("_id"),
            maximum: 1,
            course: course9,
            current: 0,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )


    condition101 = await Condition.findOneAndUpdate(
        { course: course10, plant: await Plant.findOne({ name: "C" }).select("_id") },
        {
            plant: await Plant.findOne({ name: "C" }).select("_id"),
            maximum: 1,
            course: course10,
            current: 0,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    condition102 = await Condition.findOneAndUpdate(
        { course: course10, plant: await Plant.findOne({ name: "A" }).select("_id") },
        {
            plant: await Plant.findOne({ name: "A" }).select("_id"),
            maximum: 2,
            course: course10,
            current: 1,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
}

exports.getCondition = async () => {
    return {
        condition61,
        condition62,
        condition71,
        condition72,
        condition81,
        condition91,
        condition101,
        condition102,
    }
}