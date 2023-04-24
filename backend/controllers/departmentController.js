const Department = require("../models/department")

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