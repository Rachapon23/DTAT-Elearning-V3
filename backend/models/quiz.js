const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
    question: {
        type: String,
        require: true,
    },
    choice: {
        type: Date,
    },
    image: {},
    answer: {
        type: String
    }
}, { timestamps: true });

module.exports = Quiz = mongoose.model("quiz", QuizSchema);