const Profile = require("../models/profile");
const User = require("../models/user")

// GET: /get-profile/user/:id
exports.getProfileByUserId = async (req, res) => {
    try {
        const { user } = req
        const user_data = await User.findOne({ _id: user?.user_id }).select("profile firstname lastname email -_id")
        if(!user_data.profile) return res.status(404).json({ error: "Profile not found" });

        const profile_data = await Profile.findOne({ _id: user_data.profile })
        return res.json({ data: { ...user_data._doc, ...profile_data._doc } });
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