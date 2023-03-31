const Plant = require('../models/plant')

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
        const plant = await Plant.find({});

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