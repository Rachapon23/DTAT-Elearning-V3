const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema

const UserSchema = new mongoose.Schema({
    employee: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    firstname: {
        type: String,
        require: true,
    },
    lastname: {
        type: String,
        require: true,
    },
    email: {
        type: String,
    }, 
    enabled: {
        type: Boolean,
        default: true,
    },
    profile: {
        type: ObjectId,
        ref: "profile",
    },
    department: {
        type: ObjectId,
        ref: "department",
    },
    role: {
        type: ObjectId,
        ref: "role",
    },
    plant: {
        type: ObjectId,
        ref: "plant",
    },
}, { timestamps: true });

module.exports = User = mongoose.model("users", UserSchema);