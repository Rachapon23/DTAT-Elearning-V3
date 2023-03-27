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
    quiz: [{
        type: ObjectId,
        ref:"quiz",
    }],
}, { timestamps: true });

module.exports = Quize = mongoose.model("exam", ExamSchema);