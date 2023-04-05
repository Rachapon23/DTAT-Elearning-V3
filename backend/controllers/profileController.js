const Profile = require("../models/profile");


// GET: /get-profile/:id
exports.getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ _id: req.params.id })

        return res.json({ data: profile });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Unexpected error on get profile" });
    }
}

// PUT: /update-profile/:id
exports.updateProfile = async (req, res) => {
    try {
        const profile = await Profile.findOneAndUpdate(
            { _id: req.params.id },
            { ...req.body },
            { new: true },
        )

        return res.json({ data: profile });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Unexpected error on update profile" });
    }
}