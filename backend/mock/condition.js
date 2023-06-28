const Condition = require("../models/condition");
const { getCourse } = require("./course")

let condition11
let condition12
let condition21
let condition22
let condition31
let condition41
let condition51

exports.loadCondition = async () => {
    const {
        course1,
        course2,
        course3,
        course4,
        course5
    } = await getCourse()


    condition11 = await Condition.findOneAndUpdate(
        { course: course1, plant: await Plant.findOne({ name: "A" }).select("_id") },
        {
            plant: await Plant.findOne({ name: "A" }).select("_id"),
            maximum: 1,
            course: course1,
            current: 0,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    condition12 = await Condition.findOneAndUpdate(
        { course: course1, plant: await Plant.findOne({ name: "B" }).select("_id") },
        {
            plant: await Plant.findOne({ name: "B" }).select("_id"),
            maximum: 1,
            course: course1,
            current: 0,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    condition21 = await Condition.findOneAndUpdate(
        { course: course2, plant: await Plant.findOne({ name: "A" }).select("_id") },
        {
            plant: await Plant.findOne({ name: "A" }).select("_id"),
            maximum: 1,
            course: course2,
            current: 0,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    condition22 = await Condition.findOneAndUpdate(
        { course: course2, plant: await Plant.findOne({ name: "B" }).select("_id") },
        {
            plant: await Plant.findOne({ name: "B" }).select("_id"),
            maximum: 1,
            course: course2,
            current: 0,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )


    condition31 = await Condition.findOneAndUpdate(
        { course: course3, plant: await Plant.findOne({ name: "A" }).select("_id") },
        {
            plant: await Plant.findOne({ name: "A" }).select("_id"),
            maximum: 1,
            course: course3,
            current: 0,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )


    condition41 = await Condition.findOneAndUpdate(
        { course: course4, plant: await Plant.findOne({ name: "B" }).select("_id") },
        {
            plant: await Plant.findOne({ name: "B" }).select("_id"),
            maximum: 1,
            course: course4,
            current: 0,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )


    condition51 = await Condition.findOneAndUpdate(
        { course: course5, plant: await Plant.findOne({ name: "C" }).select("_id") },
        {
            plant: await Plant.findOne({ name: "C" }).select("_id"),
            maximum: 1,
            course: course5,
            current: 0,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
}

exports.getCondition = async () => {
    return {
        condition11,
        condition12,
        condition21,
        condition22,
        condition31,
        condition41,
        condition51,
    }
}