const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const HomeSchema = new mongoose.Schema({
    acnounce: [],
    course_public: [{
        type: ObjectId,
        ref:"course"
    }],
    course_private: [{
        type: ObjectId,
        ref:"course"
    }]
});

module.exports = Home = mongoose.model("home", HomeSchema);