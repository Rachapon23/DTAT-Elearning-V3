const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
    room: {
        type: String,
    },
    floor: {
        type: Number,
    },
});

module.exports = Room = mongoose.model("room", RoomSchema);