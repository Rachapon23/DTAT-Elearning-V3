const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const TopicSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    detail: {
      type: String,
    },
    sub_content: {
        type: [],
    },
    link: {
        type: [{}]
    },
    file: {
        type: [{}],
    },
    course: {
        type: ObjectId,
        ref: "course"
    },
}, { timestamps: true });

module.exports = Topic = mongoose.model("topic", TopicSchema);
