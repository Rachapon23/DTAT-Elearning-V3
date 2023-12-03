const User = require("../models/user");
const Role = require("../models/role");
const bcrypt = require("bcryptjs");
const Profile = require("../models/profile");

const { validateQuery } = require('./util')
const { dev } = require('#devUtil.js')

// GET: /list-user
exports.listUser = async (req, res) => {
    try {
        const users = await User.find({})
            .select("-password -__v -createdAt")
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

// POST: /get-user/:id
exports.getUser = async (req, res) => {
    const allowField = ["user", "course", "ans", "plant", "-_id"]
    const allowedSearch = ["user", "course", "ans", "_id"]
    const allowedPops = ["user", "course", "exam", "plant", "_id", "name", "exam -_id", "ans", "image"]
    const allowedPropsField = ["path", "select", "populate"]
    const allowedSelect = ["ans", "firstname", "lastname", "employee", "role"]
    const allowedFetch = ["-ans", "-__v", "plant", "-_id"]
    try {
        const user_role = req?.user?.role;

        // only admin can get other user data
        if (user_role !== 'admin') {
            const token_user_id = req?.user.user_id;
            const req_user_id = req?.params?.id;
            if(token_user_id !== req_user_id) {
                return res.status(403).json({ error: `Access denine for ${user_role}` })
            }
        }


        const result = validateQuery(
            "get",
            "get user",
            req?.user?.role,
            null,
            false,//req?.user?.role === "admin",
            {
                teacher: {
                    // fields: { data: "role"},
                    // fetchs: { data: "role"},
                    selects: { data: "-password -verified -createdAt -__v"},
                    search: { data: { _id: req?.params?.id } },
                    subPops: null,
                },
                student: {
                    // fields: { data: "role"},
                    // fetchs: { data: "role"},
                    selects: { data: "-password -verified -createdAt -__v"},
                    search: { data: { _id: req?.params?.id } },
                    // subPops: null,
                }
            },
            {
                fields: req?.query?.field,
                fetchs: req?.query?.fetch,
                selects: req?.query?.selects,
                search: req?.params?.id ? `_id:${req?.params?.id}` : req?.query?.search,
                subPops: req?.query?.pops,
            },
            {
                fields: allowField,
                search: allowedSearch,
                subPops: {
                    method: allowedPropsField,
                    fields: allowedPops,
                },
                selects: allowedSelect,
                fetchs: allowedFetch,

            },
            false
        )
        dev.log(result)
        if (!result.success) return res.status(result.code).json({ error: result.message })

        const user = await User
            .findOne(result.options.searchParams, result.options.fetchParams)
            .populate(result.options.fieldParams ? result.options.fieldParams : result.options.subPropsParams)
            .select(result.options.selectParams)
        // console.log(user)
        return res.json({ data: user })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Server Error!!! on list user" });
    }
}

// GET: /list-student
exports.listUserRole = async (req, res) => {
    try {
        const role = await Role.findOne({ name: req.params.role });
        const user = await User.find({ role: role._id })
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
        const id = req?.params?.id
        const status = req?.body?.enabled === true;
        if (!id) return res.status(400).json({ error: "Request not in correct form" });
        if (status === null || status === undefined) return res.status(400).json({ error: "Request not in correct form" });
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

// PUT: /update-timeusage/:id
exports.updateTimeusage = async (req, res) => {
    try {
        const id = req?.params?.id
        const timeusage = req?.body?.timeusage
        if (!id) return res.status(400).json({ error: "Request not in correct form" });
        if (!timeusage) return res.status(400).json({ error: "Request not in correct form" });
        const updated_user = await User.findOneAndUpdate(
            { _id: id },
            { timeusage: timeusage },
            { new: true }
        )
        if (!updated_user) return res.status(404).json({ error: "User not found" });
        return res.json({ data: "Saved time usage" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Server Error!!! on save time usage" });
    }
}

// PUT: /update-password/:id
exports.updateUserPassword = async (req, res) => {
    try {
        const id = req?.params?.id
        const new_password = req?.body?.new_password;
        const confirm = req?.body?.confirm;

        if (!id) return res.status(400).json({ error: "Request not in correct form" });
        if (!new_password) return res.status(400).json({ error: "Request not in correct form" });
        if (!confirm) return res.status(400).json({ error: "Request not in correct form" });
        if (new_password !== confirm) return res.status(400).json({ error: "New password must be the same as confirm password" });

        const salt = await bcrypt.genSalt(10);
        const encrypted_password = await bcrypt.hash(confirm, salt);

        const user = await User.findOneAndUpdate(
            { _id: id },
            { password: encrypted_password },
            { new: true }
        )
        if (!user) return res.status(400).json({ error: "Cannot reset password" });
        return res.json({ data: 'Reset password success' });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Unexpected error on reset pasword" });
    }
}

// DELETE: /remove-user/:id
exports.removeUser = async (req, res) => {
    try {
        const id = req?.params?.id
        if (!id) return res.status(400).json({ error: "Request not in correct form" });
        const deletedUser = await User.findOne({ _id: id }).populate('role', 'name')
        if (deletedUser.role.name === 'admin') {
            return res.status(403).json({ error: "Cannot delete admin user" });
        }

        if (!deletedUser) return res.status(404).json({ error: "User not found" });
        const affected = await User.deleteOne({ _id: id })
        if (affected.deletedCount === 1) {
            return res.json({ data: 'Delete user success' });
        }
        return res.status(404).json({ error: "Targer user not affected by delete" });

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Server Error!!! on remove user" });
    }
}

