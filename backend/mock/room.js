const Room = require("../models/room");

exports.loadRoom = async () => {
    await Room.findOneAndUpdate(
        { name: "Material 1" },
        { name: "Material 1", floor: 1 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Room.findOneAndUpdate(
        { name: "Technical Skill 1" },
        { name: "Technical Skill 1", floor: 1 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Room.findOneAndUpdate(
        { name: "Technical Skill 2" },
        { name: "Technical Skill 2", floor: 1 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Room.findOneAndUpdate(
        { name: "Technical Skill 3" },
        { name: "Technical Skill 3", floor: 1 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Room.findOneAndUpdate(
        { name: "Technical Skill 4" },
        { name: "Technical Skill 4", floor: 1 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Room.findOneAndUpdate(
        { name: "Office" },
        { name: "Office", floor: 1 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Room.findOneAndUpdate(
        { name: "Teacher Room" },
        { name: "Teacher Room", floor: 1 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Room.findOneAndUpdate(
        { name: "Guest Room" },
        { name: "Guest Room", floor: 1 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Room.findOneAndUpdate(
        { name: "Material 2" },
        { name: "Material 2", floor: 2 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Room.findOneAndUpdate(
        { name: "Technical Skill 5" },
        { name: "Technical Skill 5", floor: 2 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Room.findOneAndUpdate(
        { name: "Technical Skill 6" },
        { name: "Technical Skill 6", floor: 2 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Room.findOneAndUpdate(
        { name: "Technical Skill 7" },
        { name: "Technical Skill 7", floor: 2 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Room.findOneAndUpdate(
        { name: "Discussion 1" },
        { name: "Discussion 1", floor: 2 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Room.findOneAndUpdate(
        { name: "Discussion 2" },
        { name: "Discussion 2", floor: 2 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Room.findOneAndUpdate(
        { name: "Discussion 3" },
        { name: "Discussion 3", floor: 2 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Room.findOneAndUpdate(
        { name: "Lecture 1" },
        { name: "Lecture 1", floor: 2 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Room.findOneAndUpdate(
        { name: "Lecture 2" },
        { name: "Lecture 2", floor: 2 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Room.findOneAndUpdate(
        { name: "Hall" },
        { name: "Hall", floor: 2 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
}