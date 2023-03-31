const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const CourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    detail: {
      type: String,
    },
    type: {
      type: Boolean,
    },
    video: {
      type: Number,
    },
    image: {
      type: String,
    },
    enabled: {
      type: Boolean,
      default: false,
    },
    condition: [{
      type: ObjectId,
      ref: "condition",
    }],
    topic: [{
      type: ObjectId,
      ref: "topic",
    }],
    room: {
      type: ObjectId,
      ref: "layout",
    },
    calendar: {
      type: ObjectId,
      ref: "calendar",
    },
    exam: {
      type: ObjectId,
      ref: "exam",
    },
  },
  { timestamps: true }
);

module.exports = Course = mongoose.model("course", CourseSchema);
