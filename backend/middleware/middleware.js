const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Multer = require("multer")
const fs = require("fs")

exports.checkUser = (req, res, next) => {
    try {
        const token = req.headers["authtoken"]

        if (!token) {
            return res.status(401).json({error: "No token, authorization denied"})
        }

        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if(err) return res.status(401).json({error: "Invalid token, authorization denied"})
            req.user = decoded.user
        })
        
        next()
    } 
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "Unxpected error on check user" })
    }
}

exports.checkTeacher = async (req, res, next) => {
    try {
        const { user_id } = req?.user
        const teacherUser = await User.findOne({ _id: user_id }).populate("role", "name -_id").exec()

        if (teacherUser.role.name == 'teacher' || teacherUser.role.name == 'admin') {
            next()
        }
        else {
            res.status(403).json({ error: "Teacher Access denied", role: teacherUser.role })
        }

    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "Unxpected error on check teacher" })
    }
}

exports.checkAdmin = async (req, res, next) => {
    try {
        const { user_id } = req.user
        const adminUser = await User.findOne({ _id: user_id }).populate("role", "name -_id").exec();
        if (adminUser.role.name !== 'admin') {
            res.status(403).send({ error: "Admin Access denied", role: adminUser.role })
        }
        else {
            next()
        }

    } 
    catch (err) {
        console.log(err)
        res.status(403).json({ error: "Unxpected error on check admin" })
    }
}

const storagePublic = Multer.diskStorage({
    destination: (req, file, cb) => {
        if(!fs.existsSync("./public/uploads")) {
            fs.mkdirSync("./public/uploads")
        }
        cb(null, "./public/uploads")
    },
    filename: (req, file, cb) => {
        const uniqueStr = `${Date.now()}-${Math.round(Math.random() * 1E9)}`
        const splitedFileName = file.originalname.split(".")
        const fileExtension = splitedFileName[splitedFileName.length - 1]
        req.body["name"] = `${file.fieldname}-${uniqueStr}.${fileExtension}`
        req.body["upload_type"] = "public";
        cb(null, `${file.fieldname}-${uniqueStr}.${fileExtension}`)
    }
})
exports.uploadPublic = Multer({storage: storagePublic}).single('file')

const storagePrivate = Multer.diskStorage({
    destination: (req, file, cb) => {
        if(!fs.existsSync("./private/uploads")) {
            fs.mkdirSync("./private/uploads")
        }
        cb(null, "./private/uploads")
    },
    filename: (req, file, cb) => {
        const uniqueStr = `${Date.now()}-${Math.round(Math.random() * 1E9)}`
        const splitedFileName = file.originalname.split(".")
        const fileExtension = splitedFileName[splitedFileName.length - 1]
        req.body["name"] = `${file.fieldname}-${uniqueStr}.${fileExtension}`
        req.body["upload_type"] = "private";
        cb(null, `${file.fieldname}-${uniqueStr}.${fileExtension}`)
    }
})
exports.uploadPrivate = Multer({storage: storagePrivate}).single('file')