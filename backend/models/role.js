const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
    },
}, {timestamps: true});

module.exports = Role = mongoose.model("role", RoleSchema);