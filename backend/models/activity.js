const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ActivitySchema = new mongoose.Schema({
    score_max: {
        type: Number,
    },
    score_value: {
        type: Number,
    },
    ans: {
        type: {}
    },
    progress: {
        type: Number,
    },
    completed: {
        type: Boolean,
    },
    result: {
        type: Number,
        default: 0,
    },
    user: {
        type: ObjectId,
        ref: "users",
    },
    course: {
        type: ObjectId,
        ref: "course"
    },
}, { timestamps: true });

module.exports = Activity = mongoose.model("activity", ActivitySchema);