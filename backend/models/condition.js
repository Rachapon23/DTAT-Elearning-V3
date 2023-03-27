const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema

const ConditionSchema = new mongoose.Schema({
    maximum: {
        type: String,
        require: true,
    },
    plant: {
        type: ObjectId,
        ref:"plant",
    },
}, { timestamps: true });

module.exports = Condition = mongoose.model("condition", ConditionSchema);