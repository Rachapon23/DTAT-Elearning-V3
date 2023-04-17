
const Layout = require('../models/room');

// POST: /create-room
exports.createRoom = async (req, res) => {
    try {
        const room = await new Layout(req.body).save();

        res.json({ data: room });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server Error!!! on create Room" });
    }
};

// GET: /list-room
exports.listRoom = async (req, res) => {
    try {
        const room = await Layout.find({}).select("-__v");

        res.json({ data: room });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server Error!!! on list Room" });
    }
};

// DELETE: /remove-room/:id
exports.removeRoom = async (req, res) => {
    try {
        const room = await Layout.findOneAndDelete({ _id: req.params.id });

        res.json({ data: room });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server Error!!! on remove Room" });
    }
};
