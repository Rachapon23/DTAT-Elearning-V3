const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema

const ExamSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    detail: {
        type: String,
    },
    teacher: {
        type: ObjectId,
        ref:"user",
    },
    quiz: [{
        type: ObjectId,
        ref:"quiz",
    }],
}, { timestamps: true });

module.exports = Quize = mongoose.model("exam", ExamSchema);