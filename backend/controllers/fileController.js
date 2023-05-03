const Exam = require("../models/exam")
const Course = require("../models/course")

// POST: /create-file/:field
exports.createFile = async (req, res) => {
    try {
        const payload = {
            name: req?.body?.name,
            original_name: req?.body?.original_name,
        }
        res.json({data: payload});
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ error: "Server Error!!! on create file" });
    }
};