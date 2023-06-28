const Plant = require("../models/plant");

exports.loadPlant = async () => {
    await Plant.findOneAndUpdate({ name: "A" }, { name: "A" }, { upsert: true, new: true, setDefaultsOnInsert: true })
    await Plant.findOneAndUpdate({ name: "B" }, { name: "B" }, { upsert: true, new: true, setDefaultsOnInsert: true })
    await Plant.findOneAndUpdate({ name: "C" }, { name: "C" }, { upsert: true, new: true, setDefaultsOnInsert: true })
    await Plant.findOneAndUpdate({ name: "D" }, { name: "D" }, { upsert: true, new: true, setDefaultsOnInsert: true })
    await Plant.findOneAndUpdate({ name: "E" }, { name: "E" }, { upsert: true, new: true, setDefaultsOnInsert: true })
}