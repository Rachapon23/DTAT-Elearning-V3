const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({
    id: {
        type: String,
    },
}, {timestamps: true});

module.exports = Department = mongoose.model("department", DepartmentSchema);