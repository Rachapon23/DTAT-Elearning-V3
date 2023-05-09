const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
    question: {
        type: String,
        require: true,
    },
    choices: [{
        type: String,
    }],
    image: {},
    answer: {
        type: Number
    }
}, { timestamps: true });

module.exports = Quiz = mongoose.model("quiz", QuizSchema);