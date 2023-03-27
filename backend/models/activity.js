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
        type: []
    },
    process: {
        type: [],
    },
    completed: {
        type: Boolean,
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