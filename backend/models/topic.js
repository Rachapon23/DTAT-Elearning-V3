const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    detail: {
        type: String,
    },
    sub_content: {
        type: Number,
    },
    link: [{}],
    file: {
        type: []
    }
}, {timestamps: true});

module.exports = Topic = mongoose.model("topic", TopicSchema);