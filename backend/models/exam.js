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
    enable: {
        type: Boolean,
    },
    teacher: {
        type: ObjectId,
        ref:"user",
    },
    quiz: [{
        type: ObjectId,
        ref:"quiz",
    }],
    course: {
        type: ObjectId,
        ref:"course",
    }
}, { timestamps: true });

module.exports = Quize = mongoose.model("exam", ExamSchema);