const Plant = require('../models/plant')
const Condition = require('../models/condition')

// POST: create-plant
exports.createPlant = async (req, res) => {
    try {
        const plant = await new Plant(req.body).save();

        res.json({ data: plant });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server Error!!! on create plant" });
    }
};

// GET: /list-plant
exports.listPlant = async (req, res) => {
    try {
        const plant = await Plant.find({}).select("-__v");

        res.json({ data: plant });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ error: "Server Error!!! on list Plant" });
    }
};

// DELETE: /remove-plant/:id
exports.removePlant = async (req, res) => {
    try {
        const plant = await Plant.findOneAndDelete({ _id: req.params.id });

        res.json({ data: plant });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ error: "Server Error!!! on remove Plant" });
    }
};

// GET: /list-plant/sp/no-duplicate?plant=<plant name>
exports.listPlantNoDuplicate = async (req, res) => {
    try {
        const query = req?.query?.course_id

        if (!query) {
            const plant = await Plant.find({}).select("-__v");
            return res.json({ data: plant });
        }
        const condition = await Condition.find({ course: query }, "plant -_id")
        const mappedCondition = condition.map((item) => item.plant)
        const plant = await Plant.find({ "_id": { $nin:  mappedCondition  } })
 
        return res.json({ data: plant });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ error: "Server Error!!! on list Plant" });
    }
};