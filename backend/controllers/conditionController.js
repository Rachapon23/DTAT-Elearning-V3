const Condition = require("../models/condition");
const Course = require("../models/course");

const { validateQuery } = require('./util')

// POST: create-condition
exports.createCondition = async (req, res) => {
    try {
        const plant = req?.body?.plant
        const maximum = req?.body?.maximum
        const course_id = req?.params?.id

        if (!plant) return res.status(400).json({ error: "Missing plant ID" });
        if (!maximum) return res.status(400).json({ error: "Missing maximum" });
        if (!course_id) return res.status(400).json({ error: "Missing course ID" });

        const conditionFind = await Condition.findOne({ course: course_id, plant: plant });
        if(conditionFind) {
            return res.status(400).json({ error: "Cannot create condition with duplicate plant" });
        }

        const condition = await new Condition({
            plant: plant,
            maximum: maximum,
            course: course_id,
            current: 0,
        }).save();

        const courseFind = await Course.findOne({ _id: course_id });
        const condition_update = courseFind.condition;
        condition_update.push(condition._id);

        await Course.findOneAndUpdate(
            { _id: course_id },
            {
                condition: condition_update,
            },
            { new: true }
        );
        return res.json(condition);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Server Error!!! on create condition" });
    }
};

// GET: /list-condition/course/:id
exports.listConditionCourse = async (req, res) => {
    try {
        const condition = await Condition.find({ course: req.params.id }).populate('plant')
        console.log(condition)
        res.json(condition);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server Error!!! on create condition" });
    }
};

// DELETE: delete-condition
exports.deleteCondition = async (req, res) => {
    try {
        const course_id = req?.body?.course_id
        const condition_id = req?.params?.id
        if (!course_id) return res.status(400).json({ error: "Missing course ID" });

        const courseFind = await Course.findOne({ _id: course_id });
        const condition_update = courseFind.condition
        condition_update.splice(condition_update.indexOf(condition_id), 1);

        await Course.findOneAndUpdate(
            { _id: course_id },
            {
                condition: condition_update
            },
            { new: true }
        );

        const condition = await Condition.findOneAndDelete({ _id: condition_id })
        return res.json(condition);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Server Error!!! on create condition" });
    }
};
