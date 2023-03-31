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
exports.listStudent = async (req, res) => {
  try {
    const role = await Role.findOne({ name: "student" }).select("_id")
    const user = await User.find({ role: role._id }).select("-password")

    return res.json({ data: user });
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error!!! on listStudentuser" });
  }
};

// GET: /list-teacher
exports.listTeacher = async (req, res) => {
  try {
    const role = await Role.findOne({ name: "teacher" }).select("_id")
    const user = await User.find({ role: role._id }).select("-password")

    return res.json({ data: user });
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error!!! on listStudentuser" });
  }
};

// POST: /change-role
exports.changeRole = async (req, res) => {
  try {
    const role = await Role.findOne({ name: req.body.role })
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { role: role._id }
    ).select("-password")

    if (role.name === "teacher") {
      if (user.profile === null) {
        const profile = await new Profile({
          image: null,
          tel: null,
          email: user.email,
          target: 0,
        }).save();

        user.profile = profile;
        await user.save();
      }
    }

    return res.json({ data: user });
  }
  catch (err) {
    console.log(err);
    return res.status(500).jsone({ error: "Server Error!!! on ChangeRole" });
  }
};

// PUT: /change-enable
exports.changeEnable = async (req, res) => {
  try {
    const data = req.body
    const status = data.enabled === true;
    const user = await User.findOneAndUpdate(
      { _id: data.id },
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




