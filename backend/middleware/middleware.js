const jwt = require('jsonwebtoken')
const User = require('../models/user')
const TimeUsage = require("../models/timeUsage")
const { getDiffTimePeriod } = require("../controllers/util")
const Multer = require("multer")
const fs = require("fs")

const allowedField = [
    "exam",
    "course",
    "announce",
    "topic"
]

exports.checkFileAccess = (req, res, next) => {
    try {
        const token = req.query.token
        let invalid = null

        if (!token) {
            return res.status(401).json({ error: "No token, authorization denied" })
        }

        jwt.verify(token, process.env.JWT_CODE, (err, decoded) => {
            if (err) {
                invalid = err;
                return res.status(401).json({ error: "Invalid token, authorization denied" })
            }
            if (!decoded.private_file_access) {
                invalid = true
                return res.status(403).json({ error: "Forbidden to access private file" })
            }
        })
        if (invalid) return
        next()
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Unxpected error on check user" })
    }
}

exports.checkUser = (req, res, next) => {
    try {
        const token = req.headers["authtoken"]
        let invalid = null

        if (!token) {
            return res.status(401).json({ error: "No token, authorization denied" })
        }

        jwt.verify(token, process.env.JWT_CODE, (err, decoded) => {
            if (err) {
                invalid = err;
                return res.status(401).json({ error: "Invalid token, authorization denied" })
            }
            req.user = decoded.user;
        })
        if (invalid) return

        next()
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Unxpected error on check user" })
    }
}

exports.checkTeacher = async (req, res, next) => {
    try {
        const { user_id } = req?.user
        const teacherUser = await User.findOne({ _id: user_id }).populate("role", "name -_id").exec()

        if (teacherUser?.role?.name === 'teacher' || teacherUser?.role?.name === 'admin') {
            next()
        }
        else {
            return res.status(403).json({ error: "Teacher Access denied", role: teacherUser?.role })
        }

    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Unxpected error on check teacher" })
    }
}

exports.checkAdmin = async (req, res, next) => {
    try {
        const { user_id } = req.user
        const adminUser = await User.findOne({ _id: user_id }).populate("role", "name -_id").exec();
        if (adminUser.role.name !== 'admin') {
            return res.status(403).send({ error: "Admin Access denied", role: adminUser.role })
        }
        else {
            next()
        }

    }
    catch (err) {
        console.log(err)
        return res.status(403).json({ error: "Unxpected error on check admin" })
    }
}

exports.updateTimeUsage = async (req, res, next) => {
    try {
        const id = req?.user?.user_id
        const timeusage = { now: new Date() }
        if (!id) return res.status(400).json({ error: "Request not in correct form" });
        if (!timeusage) return res.status(400).json({ error: "Request not in correct form" });
        if (!timeusage.now) return res.status(400).json({ error: "Request not in correct form" });
        const user = await User.findOne({ _id: id })
        if (!user) return res.status(404).json({ error: "User not found" });

        const now = new Date().toLocaleDateString().split("/")
        const day = now[1]
        const month = now[0]
        const year = now[2]
        const findDate = new Date().setHours(24, 0, 0, 0)

        const userTimeUsage = await TimeUsage.findOne({ user: id, date: findDate })

        if (!userTimeUsage) {
            const logged_in_at = new Date()
            const diff = timeusage.now - logged_in_at

            // update last time useage
            const preTimeUsage = await TimeUsage.findOne({ _id: user.timeusage })
            console.log(preTimeUsage)
            const arrayLength = preTimeUsage.timeusage.length
            const length = arrayLength - 1 < 0 ? 0 : arrayLength - 1
            let hasUpdate = false

            if (preTimeUsage.timeusage[length].diff === null) {
                preTimeUsage.timeusage[length].diff = diff
                hasUpdate = true
            }

            if (preTimeUsage.timeusage[length].used_time === null) {
                preTimeUsage.timeusage[length].diff = getDiffTimePeriod(diff)
                hasUpdate = true
            }

            if (hasUpdate) {
                preTimeUsage.markModified('timeusage')
                preTimeUsage.save()
            }
            else {
                // create new time useage
                await TimeUsage.create({
                    user: id,
                    date: findDate,
                    timeusage: [{
                        logged_in_at: logged_in_at,
                        diff: diff,
                        used_time: getDiffTimePeriod(diff),
                    }]
                })
            }
            return res.json({ data: "Saved time usage" });
        }

        const arrayLength = userTimeUsage.timeusage.length
        const length = arrayLength - 1 < 0 ? 0 : arrayLength - 1

        const logged_in_at = userTimeUsage?.timeusage[length].logged_in_at
        const diff = timeusage.now - logged_in_at

        const data = {
            logged_in_at,
            diff,
            used_time: getDiffTimePeriod(diff)
        }

        // userTimeUsage.timeusage[length] = data
        // userTimeUsage.markModified('timeusage')
        await TimeUsage.findOneAndUpdate(
            { user: id, date: findDate },
            { $set: { [`timeusage.${length}`]: data } },
            { new: true }
        )
        next()
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Server Error!!! on save time usage" });
    }
}

const storagePublic = Multer.diskStorage({
    destination: (req, file, cb) => {

        if (!fs.existsSync("./public/uploads")) {
            fs.mkdirSync("./public/uploads", { recursive: true })
        }
        if (req?.params?.field && allowedField.includes(req?.params?.field)) {
            if (!fs.existsSync(`./public/uploads/${req.params.field}`)) {
                fs.mkdirSync(`./public/uploads/${req.params.field}`, { recursive: true })
            }
            path = `./public/uploads/${req.params.field}`
        }
        cb(null, `./public/uploads/${req.params.field}`)
    },
    filename: (req, file, cb) => {
        // console.log(req.originalUrl.split("/")[2].split("-")[1])
        const uniqueStr = `${Date.now()}-${Math.round(Math.random() * 1E9)}`
        const splitedFileName = file.originalname.split(".")
        const fileExtension = splitedFileName[splitedFileName.length - 1]
        req.body["name"] = `${file.fieldname}-${uniqueStr}.${fileExtension}`
        req.body["upload_type"] = "public";
        req.body["field"] = `${req.params.field}`
        cb(null, `${file.fieldname}-${uniqueStr}.${fileExtension}`)

    }
})
exports.uploadPublic = Multer({ storage: storagePublic }).single('file')

const storagePrivate = Multer.diskStorage({
    destination: (req, file, cb) => {
        let path = "./private/uploads"
        if (!fs.existsSync("./private/uploads")) {
            fs.mkdirSync("./private/uploads", { recursive: true })
        }
        if (req?.params?.field && allowedField.includes(req?.params?.field)) {
            if (!fs.existsSync(`./private/uploads/${req.params.field}`)) {
                fs.mkdirSync(`./private/uploads/${req.params.field}`, { recursive: true })
            }
            path = `./private/uploads/${req.params.field}`
        }
        cb(null, path)
    },
    filename: (req, file, cb) => {
        // console.log(req.originalUrl.split("/")[2].split("-")[1])
        const uniqueStr = `${Date.now()}-${Math.round(Math.random() * 1E9)}`
        const splitedFileName = file.originalname.split(".")
        const fileExtension = splitedFileName[splitedFileName.length - 1]
        req.body["name"] = `${file.fieldname}-${uniqueStr}.${fileExtension}`
        req.body["upload_type"] = "private";
        req.body["field"] = `${req.params.field}`
        cb(null, `${file.fieldname}-${uniqueStr}.${fileExtension}`)
    }
})
exports.uploadPrivate = Multer({ storage: storagePrivate }).single('file')