const Department = require("../models/department")

// POST: create-department
exports.createDepartment = async (req, res) => {
    try {
        const department = await new Department(req.body).save();

        res.json({ data: department });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server Error!!! on create Department" });
    }
};

// GET: /list-department
exports.listDepartment = async (req, res) => {
    try {
        const department = await Department.find({}).select("_id id");

        res.json({ data: department });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ error: "Server Error!!! on list Department" });
    }
};

// DELETE: /remove-department/:id
exports.removeDepartment = async (req, res) => {
    try {
        const department = await Department.findOneAndDelete({ _id: req.params.id });

        res.json({ data: department });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ error: "Server Error!!! on remove Plant" });
    }
};