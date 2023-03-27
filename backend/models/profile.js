const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    image: {
        type: String,
    },
    tel: {
        type: String,
    },
    target: {
        type: Number,
    },
}, { timestamps: true });

module.exports = Profile = mongoose.model("profile", ProfileSchema);