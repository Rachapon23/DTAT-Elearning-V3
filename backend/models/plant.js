const mongoose = require("mongoose");

const PlantSchema = new mongoose.Schema({
    name: {
        type: String,
    },
});

module.exports = Plant = mongoose.model("plant", PlantSchema);