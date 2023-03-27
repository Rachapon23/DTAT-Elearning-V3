const mongoose = require("mongoose");

const LayoutSchema = new mongoose.Schema({
    room: {
        type: String,
    },
    floor: {
        type: Number,
    },
});

module.exports = Layout = mongoose.model("layout", LayoutSchema);