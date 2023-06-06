const User = require("../models/user");
const Role = require("../models/role");
const Profile = require("../models/profile");

const { validateQuery } = require('./util')

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

// POST: /get-user/:id
exports.getUser = async (req, res) => {
    const allowField = ["user", "course", "ans"]
    const allowedSearch = ["user", "course", "ans"]
    const allowedPops = ["user", "course", "exam", "plant", "_id", "name", "exam -_id", "ans", "image"]
    const allowedPropsField = ["path", "select", "populate"]
    const allowedSelect = ["ans"]
    const allowedFetch = ["-ans", "-__v"]
    try {
        const result = validateQuery(
            "get",
            "get user",
            req?.user?.role,
            null,
            req?.user?.role === "admin",
            {
                fields: "role",
                fetchs: "role",
                selects: "role",
                search: { user: req?.params?.id },
                subPops: null,
            },
            {
                fields: req?.query?.field,
                fetchs: req?.query?.fetch,
                selects: req?.query?.selects,
                search: req?.params?._id ? req?.params?._id : req?.query?.search,
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
        // console.log(result)
        if (!result.success) return res.status(result.code).json({ error: result.message })

        const user = await User
            .findOne(result.options.searchParams, result.options.fetchParams)
            .populate(result.options.fieldParams ? result.options.fieldParams : result.options.subPropsParams)
            .select(result.options.selectParams)
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




