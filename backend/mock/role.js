const Role = require("../models/role");

exports.loadRole = async () => {
    await Role.findOneAndUpdate({ name: "student" }, { name: "student" }, { upsert: true, new: true, setDefaultsOnInsert: true })
    await Role.findOneAndUpdate({ name: "teacher" }, { name: "teacher" }, { upsert: true, new: true, setDefaultsOnInsert: true })
    await Role.findOneAndUpdate({ name: "admin" }, { name: "admin" }, { upsert: true, new: true, setDefaultsOnInsert: true })
}