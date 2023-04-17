const User = require("../models/user");
const Role = require("../models/role");
const Profile = require("../models/profile");

// GET: /list-user
exports.listUser = async (req, res) => {
  try {
    const users = await User.find({})
      .select("-password -__v -createdAt -updatedAt")
      .populate({
        path: "department",
        select: "id -_id",
      })
      .populate({
        path: "plant",
        select: "name -_id",
      })
      .populate({
        path: "role",
        select: "name -_id",
      })

    return res.json({ data: users });
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error!!! on list user" });
  }
};

// GET: /list-student
exports.listUserRole = async (req, res) => {
  try {
    const role = await Role.findOne({ name: req.params.role });
    const user = await User.find({ role:  role._id })
      .select("-password -__v -createdAt -updatedAt")
      .populate({
        path: "department",
        select: "id -_id",
      })
      .populate({
        path: "plant",
        select: "name -_id",
      })
      .populate({
        path: "role",
        select: "name -_id",
      })

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




