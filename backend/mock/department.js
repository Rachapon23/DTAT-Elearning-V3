const Department = require("../models/department");

exports.loadDepartment = async () => {
    await Department.findOneAndUpdate({ id: "919323" }, { id: "919323" }, { upsert: true, new: true, setDefaultsOnInsert: true })
}