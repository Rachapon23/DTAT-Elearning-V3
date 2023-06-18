const Condition = require("../models/condition");
const Course = require("../models/course");

const { validateQuery } = require('./util')

// POST: create-condition
exports.createCondition = async (req, res) => {
    try {
        // const condition = await new Condition({
        //     plant: req.body.plant,
        //     maximum: req.body.maximum,
        // }).save();

        // const courseFind = await Course.findOne({ _id: req.params.id });
        // const condition_update = courseFind.condition;
        // condition_update.push(condition._id);

        // const course = await Course.findOneAndUpdate(
        //     { _id: req.params.id },
        //     {
        //         condition: condition_update,
        //     },
        //     { new: true }
        // );
        // return res.json({ data: condition });

        const condition = await new Condition({
            plant: req.body.plant,
            maximum: req.body.maximum,
            course: req.params.id,
            current: 0
        }).save();
        res.json(condition);
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

        // const courseFind = await Course.findOne({ _id: req.body.course_id });
        // const condition_update = courseFind.condition
        // await condition_update.splice(condition_update.indexOf(req.params.id), 1);

        // const course = await Course.findOneAndUpdate(
        //     { _id: req.params.id },
        //     {
        //         condition: condition_update
        //     },
        //     { new: true }
        // );

        // const condition = await Condition.findOneAndDelete({ _id: req.params.id })
        // return res.json({ data: condition });

        const condition = await Condition.findOneAndDelete({ _id: req.params.id })
        res.json(condition);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Server Error!!! on create condition" });
    }
};
