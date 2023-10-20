const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema

const TimeUsageSchema = new mongoose.Schema({
    timeusage: {
        type: Object,
        default: null,
    },
    date: {
        type: Date,
        default: null,
    },
    user: {
        type: ObjectId,
        ref: "users",
    },
}, { timestamps: true });

module.exports = TimeUsage = mongoose.model("timeUsage", TimeUsageSchema);