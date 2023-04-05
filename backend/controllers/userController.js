const User = require("../models/user");
const Role = require("../models/role");
const Profile = require("../models/profile");

// GET: /list-user
exports.listUser = async (req, res) => {
  try {
    const user = await User.find({}).select("-password")

    return res.json({ data: user });
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error!!! on liastAlluser" });
  }
};

// GET: /list-student
exports.listUserRole = async (req, res) => {
  try {
    const user = await User.find({ role: req.params.id }).select("-password")

    return res.json({ data: user });
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error!!! on listStudentuser" });
  }
};

// POST: /update-user/:id/role
exports.updateUserRole = async (req, res) => {
  try {
    const role = await Role.findOne({ name: req.body.role })
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { role: role._id }
    ).select("-password")

    return res.json({ data: user });
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error!!! on ChangeRole" });
  }
};

// PUT: /update-user/:id/enable
exports.updateUserEnabled = async (req, res) => {
  try {
    const id = req.params.id
    const status = req.body.enabled === true;
    const user = await User.findOneAndUpdate(
      { _id: id },
      { enabled: status },
      { new: true }
    ).select("_id enabled")

    return res.json({ data: user });
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error!!! on change enanbled" });
  }
}




