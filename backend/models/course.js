const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const CourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // require: true, not require  ; first time create not have name
      // unique: true,
    },
    detail: {
      type: String,
    },
    type: { // true -> public, false -> private
      type: Boolean,
    },
    video: {
      type: Number,
    },
    image: {
      original_name: { type: String },
      name: { type: String },
      url: { type: String },
    },
    enabled: {
      type: Boolean,
      default: false,
    },
    teacher: {
      type: ObjectId,
      ref: "users",
    },
    // ------------------
    condition: [{
      type: ObjectId,
      ref: "condition",
    }],
    topic: [{
      type: ObjectId,
      ref: "topic",
    }],
    // ------------------
    room: {
      type: ObjectId,
      ref: "room",
    },
    calendar: {
      type: ObjectId,
      ref: "calendar",
    },
    exam: {
      type: ObjectId,
      ref: "exam",
    },
    // ------------------
    activity: [{
      type: ObjectId,
      ref: "activity",
    }],
    // ------------------
  },
  { timestamps: true }
);

module.exports = Course = mongoose.model("course", CourseSchema);