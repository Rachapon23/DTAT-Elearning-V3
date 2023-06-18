const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema

const ConditionSchema = new mongoose.Schema({
    maximum: {
        type: Number,
        require: true,
    },
    current: {
        type: Number,
    },
    plant: {
        type: ObjectId,
        ref: "plant",
    },
    course: {
        type: ObjectId,
        ref: "course"
    },
}, { timestamps: true });

module.exports = Condition = mongoose.model("condition", ConditionSchema);