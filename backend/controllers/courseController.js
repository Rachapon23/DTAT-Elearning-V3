const fs = require("fs");
const Course = require("../models/course");
const Room = require("../models/room");
const Plant = require("../models/plant");
const Calendar = require("../models/calendar");
const User = require("../models/user");

const Activity = require('../models/activity')
const Condition = require("../models/condition");

// POST: /create-course
exports.createCourse = async (req, res) => {
  try {
    const { name, detail, type, teacher } = req.body;
    const { user_id } = req.user;
    // const { head, body } = req.body;

    // // find plant
    // const plant = Plant.findOne({ _id: head.plant })
    // if (!plant) return res.status(404).json({ error: "Plant not found" });

    // // find room
    // const room = Room.findOne({ _id: head.room })
    // if (!room) return res.status(404).json({ error: "Room not found" });

    // // create codition
    // const condition = await Condition.insertMany(head.condition);

    // // create course
    // const course = await new Course({
    //   name: head.name,
    //   detail: head.detail,
    //   room: head.room,
    //   video: head.video,
    //   type: head.type,
    //   enabled: head.enabled,
    //   teacher: head.teacher,
    //   calendar: null,
    //   exam: null,
    //   topic: null,
    //   image: {
    //     original_name: null,
    //     name: null,
    //   },
    //   condition: condition,
    // }).save();

    const course = await new Course({
      // name: name,
      // detail: detail,
      // type: type,
      // enabled: false,
      teacher: user_id,
    }).save();

    res.json({ data: course });
  } catch (err) {
    console.log("fail to create the course : ", err);
    res.status(500).json({ error: "Unexpected error on create course" });
  }
};

// GET: /get-course/:id
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ _id: req.params.id })
    .populate("teacher room calendar condition");

    res.json({ data: course });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unexpected error on get course" });
  }
};

// GET: /list-course
exports.listCourse = async (req, res) => {
  const allowField = ["condition", "room", "teacher", "exam"]
  try {
    const fields = req?.query?.field
    let populateField = null

    if (fields && Array.isArray(fields)) {
      if (fields.length > allowField.length) return res.status(400).json({ error: "Invalid query parameter(s)" });
      if (fields.length > 1) {
        for (let i = 0; i < fields.length; i++) {
          if (!allowField.includes(fields[i])) return res.status(400).json({ error: "Invalid query parameter(s)" });
        }
      }
      populateField = fields.join(" ")
    }
    else if (fields) {
      if (!allowField.includes(fields)) return res.status(400).json({ error: "Invalid query parameter(s)" });
      populateField = fields
    }

    switch (req?.user?.role) {
      case "admin":
        const searchedData = await Course.find({}).populate(populateField)
        return res.json({ data: searchedData });
        break;
      case "teacher":
        return res.json({ data: await Course.find({ teacher: user_id }).populate(populateField) });
        break;
      case "student":
        return res.status(403).json({ error: "Access denine for student" });
        break;
      default:
        return res
          .status(404)
          .json({ error: "This role does not exist in system" });
    }
  } catch (err) {
    console.log("fail to fetch courses");
    res.status(500).json({ error: "Unexpected error on list courses" });
  }
};

// PUT: /update-course/:id
exports.updateCourse = async (req, res) => {
  try {
    let { head } = req.body;
    const { body } = req.body;

    // find plant
    const plant = Plant.findOne({ _id: head.plant });
    if (!plant) return res.status(404).json({ error: "Plant not found" });

    // find room
    const room = Room.findOne({ _id: head.room });
    if (!room) return res.status(404).json({ error: "Room not found" });

    // find course
    const condition = Course.findOne({ _id: req.params.id }).condition;
    if (!room) return res.status(404).json({ error: "Room not found" });

    // check if condition in not the same as before
    if (head.condition !== condition) {
      // remove old codition
      await Condition.deleteMany({}, { plant: head.condition });

      // create codition
      head.condition = await Condition.insertMany(head.condition);
    }

    // update course
    const course = await Course.findOneAndUpdate({ _id: req.params.id }, head, {
      new: true,
    });

    res.json({ data: course });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unexpected error on update course" });
  }
};

// DELETE: /remove-course/:id
exports.removeCourse = async (req, res) => {
  try {
    const courses = await Course.findOneAndDelete({ _id: req.params.id });
    await Condition.deleteMany({}, { plant: courses.condition });

    res.json({ data: courses });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unexpected error on remove courses" });
  }
};

// PUT: /update-course/:id/enabled
exports.updateEnableCourse = async (req, res) => {
  try {
    const { enabled } = req.body;

    const course = await Course.findOneAndUpdate(
      { _id: req.params.id },
      { enabled: enabled },
      { new: true }
    );

    res.json({ data: course });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unexpected error on change enable course" });
  }
};

// PUT: /update-course/:id/image
exports.updateCourseImage = async (req, res) => {
  try {
    const image_data = await Course.findOne({ _id: req.params.id }).select(
      "image -_id"
    );

    let error_deleteFile = false;

    if (image_data.image) {

      fs.unlink(`./${req.body.upload_type}/uploads/${image_data.image.name}`, (err) => {
        if (err) {

          if (req.body.upload_type === "public") {
            fs.unlink(`./private/uploads/${image_data.image.name}`, (err) => {
              if (err) error_deleteFile = true;
              else error_deleteFile = false;
            });
          }
          else error_deleteFile = false;

          if (req.body.upload_type === "private") {
            fs.unlink(`./public/uploads/${image_data.image.name}`, (err) => {
              if (err) error_deleteFile = true;
              else error_deleteFile = false;
            });
          }
          else error_deleteFile = false;

            if (req.body.upload_type === "private") {
              fs.unlink(`./public/uploads/${image_data.image.name}`, (err) => {
                if (err) error_deleteFile = true;
                else error_deleteFile = false;
              });
            } else error_deleteFile = false;
          } else error_deleteFile = false;
        }
      );
    }

    if (error_deleteFile)
      return res
        .status(500)
        .json({ error: "Cannot delete previous image before update" });

    const course = await Course.findOneAndUpdate(
      { _id: req.params.id },
      {
        image: {
          original_name: req.body.original_name,
          name: req.body.name,
        },
      },
      { new: true }
    );

    return res.json({ data: course });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Unexpected error on upload course image" });
  }
};

// GET: /get-course/:id/image
exports.getCourseImage = async (req, res) => {
  try {
    const image_data = await Course.findOne({ _id: req.params.id }).select(
      "image -_id"
    );

    res.sendFile(
      `private/uploads/${image_data.image.name}`,
      { root: "." },
      (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Cannot get course image" });
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Unexpected error on get course image" });
  }
};

// GET: /get-course/sp/count
exports.getCourseCount = async (req, res) => {
  try {
    switch (req?.user?.role) {
      case "admin":
        return res.json({ data: (await Course.find({})).length });
        break;
      case "teacher":
        return res.json({
          data: (await Course.find({ teacher: user_id })).length,
        });
        break;
      case "student":
        return res.status(403).json({ error: "Access denine for student" });
        break;
      default:
        return res
          .status(404)
          .json({ error: "This role does not exist in system" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Unexpected error on get course count" });
  }
};

// GET: /list-course/sp/wo/quiz
exports.listCourseWoQuiz = async (req, res) => {
  try {
    switch (req?.user?.role) {
      case "admin":
        return res.json({ data: await Course.find({ exam: null }) });
        break;
      case "teacher":
        return res.json({
          data: (await Course.find({ teacher: user_id, exam: null })).length,
        });
        break;
      case "student":
        return res.status(403).json({ error: "Access denine for student" });
        break;
      default:
        return res
          .status(404)
          .json({ error: "This role does not exist in system" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Unexpected error on get course count" });
  }
};

// GET: /list-course/sp/graph
exports.listCourseGraphData = async (req, res) => {

  try {
    switch (req?.user?.role) {
      case "admin":
        const searchedCourse = await Course.find({})
          .populate({
            path: "condition",
            populate: {
              path: "plant"
              // select: ""
            }
          })
          .populate({
            path: "activity",
            populate: {
              path: "user",
              populate: {
                path: "plant"
                // select: ""
              }
            }
          })

        const searchedActivity = await Activity.find({}).populate("user")
        // console.log(searchedActivity.map((item) =>{
        //   if(item.completed && item.user) return item.user
        //   else return 0
        // }))
        
        // console.log(searchedCourse.map((item) => item.activity.map((item) => item.user.plant.name)))
        const payload = searchedCourse.map(
          (item) => (
            {
              name: item.name,
              plant: item.condition.map((citem) => citem.plant.name),
              plant_amount: item.condition.map((amount) => amount.maximum),
              plant_current: item.condition.map((citem) =>  item.activity.map((aitem) => citem.plant.name === aitem.user.plant.name && aitem.completed ? 1:0)[0]) ,
              current: item.activity.map((aitem) => aitem.completed ? 1:0)[0],
              maximum: item.condition.map((amount) => amount.maximum).reduce((prev, curr) => prev + curr, 0),
            }
          )
        )
        console.log(payload)
        return res.json({ data: payload });
        break;
      case "teacher":
        return res.json({ data: await Course.find({ teacher: user_id }).populate("condition") });
        break;
      case "student":
        return res.status(403).json({ error: "Access denine for student" });
        break;
      default: return res.status(404).json({ error: "This role does not exist in system" });
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unexpected error on list courses" });
  }
};

// ==============================================================================================================

exports.getUserCourse = async (req, res) => {
  try {
    // console.log(req.params)
    const { id } = req.params;
    console.log(id);
    const data = await studentActivity
      .find({ coursee: id })
      .populate("user coursee quiz")
      .exec();
    // console.log(data)
    // res.send({user:data.user,course:data.coursee,quiz:data.quiz,data:data});
    res.send(data);
  } catch (err) {
    console.log("fail to get courses");
    res.status(500).json({ error: "Unexpected error on get getUserCourse" });
  }
};

exports.searchCourse = async (req, res) => {
  try {
    const { query } = req.body;
    // console.log(query)
    let courseSearch = await Coursee.find({
      course_number: { $regex: query },
      status: "private",
    })
      .populate("teacher", "firstname")
      .exec();
    //$text:{$search:"110011"}
    res.send(courseSearch);
  } catch (err) {
    console.log(err);
    res.status(500).send("Unexpected error on searchCourse");
  }
};

exports.addCourse = async (req, res) => {
  try {
    const { id } = req.body;
    const { user_id } = req.user;

    let user = await User.findOne({ _id: user_id }).exec();
    const course = await Coursee.findOne({ _id: id }).exec();

    let plus = false;
    console.log(course, user);
    for (let i = 0; i < course.member.length; i++) {
      if (course.member[i].plant == user.plant) {
        // console.log(course.member[i].plant, user.plant)
        plus = true;
        if (course.member[i].amount <= course.member[i].registerd) {
          return res
            .status(400)
            .send(`amount ${course.member[i].plant} is max`);
        } else {
          course.member[i].registerd = course.member[i].registerd + 1;
        }
      }
    }
    if (!plus) {
      return res.status(400).send(`plant not math`);
    }

    for (let i = 0; i < user.coursee.length; i++) {
      if (user.coursee[i] == id) {
        return res.status(400).send("course already exist");
      }
    }

    course.user.push(user_id);
    const course_push = course.user;
    user.coursee.push(id);
    const user_push = user.coursee;

    console.log(course);
    const activity = new studentActivity({
      user: user_id,
      coursee: id,
      quiz: course.quiz,
    });

    await activity.save();

    // console.log(course.member)
    const newCourse = await Coursee.findOneAndUpdate(
      { _id: id },
      { user: course_push, member: course.member }
      // {member: course.member}
    ).exec();

    const newUser = await User.findOneAndUpdate(
      { _id: user_id },
      { coursee: user_push }
    ).exec();

    //************************ */

    res.send({ user: newUser, course: newCourse, studentActivity: activity });
    // res.send("{user:newUser,course:newCourse}");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! on AddCourse");
  }
};

exports.getMyCourse = async (req, res) => {
  try {
    // const { id } = req.params;
    const user = await User.findOne({ _id: req.user.user_id })
      .populate("coursee")
      // .select("coursee")
      .exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! on getMyCourse");
  }
};

exports.getMyHistoryStudent = async (req, res) => {
  try {
    // const { id } = req.params;
    const history = await History.find({ student: req.user.user_id })
      // .populate("coursee history")
      .exec();
    res.send(history);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! on getMyHistoryStudent");
  }
};
exports.getMyHistoryTeacher = async (req, res) => {
  try {
    // const { id } = req.params;
    const history = await History.find({ teacher: req.user.user_id })
      .populate("student")
      .exec();
    res.send(history);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! on getMyHistoryTeacher");
  }
};
exports.removeHistory = async (req, res) => {
  try {
    const history = await History.deleteMany({
      teacher: req.user.user_id,
    }).exec();
    res.send(history);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! on getMyHistoryTeacher");
  }
};

exports.deleteMyCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;
    const { coursee } = await User.findOne({ _id: user_id })
      .select("coursee")
      .exec();
    // console.log("before:",coursee)
    for (let i = 0; i < coursee.length; i++) {
      if (coursee[i] == id) {
        //   console.log(course[i],"--",id)
        coursee.splice(coursee.indexOf(coursee[i]), 1);
      }
    }
    // console.log("after:",coursee)
    const user_update = await User.findByIdAndUpdate(
      { _id: user_id },
      { coursee: coursee }
    ).exec();
    // console.log(id,user_id)
    res.send(user_update);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! on  deleteMyCourse");
  }
};

exports.getMyCourseTeacher = async (req, res) => {
  try {
    const { user_id } = req.user;
    const user = await User.findOne({ _id: user_id }).exec();

    if (user.role === "admin") {
      const courses = await Coursee.find({})
        .populate("teacher", "-password")
        .exec();
      return res.send(courses);
    } else {
      const courses = await Coursee.find({ teacher: user_id })
        .populate("teacher", "-password")
        .exec();
      return res.send(courses);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! on getMyCourse");
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Coursee.findOne({ _id: req.params.id }).exec();
    const calendar = await Calendar.find({ coursee: course._id });
    await Quiz.findOneAndDelete({ course: course._id }).exec();
    await Calendar.deleteMany({ coursee: course._id }).exec((err) => {
      if (err) {
        console.log(err);
        return res.status(400).send("err on delete carlendar");
      }
    });

    if (!!course.image) {
      // console.log(course.image)
      await fs.unlink("./public/uploads/" + course.image, (err) => {
        if (err) {
          console.log(err);
          res.status(400).send("err on delete img");
        } else {
          console.log("remove Success");
        }
      });
    }

    const deleteActivity = await studentActivity.deleteMany({
      coursee: req.params.id,
    });

    // TODO: if file not found in course it cannot delete course
    for (let i = 0; i < course.topic.length; i++) {
      for (let j = 0; j < course.topic[i].file.length; j++) {
        console.log("name : ", course.topic[i].file[j].filename);
        await fs.unlink(
          "./public/uploads/" + course.topic[i].file[j].filename,
          (err) => {
            if (err) {
              console.log(err);
              res.status(400).send("err on delete file");
            } else {
              console.log("remove file Success");
            }
          }
        );
      }
    }

    // const delete_home = await Home.deleteMany({coursee:req.params.id}).exec()
    // const delete_regisCourse = await ReGiscourse.deleteMany({coursee:req.params.id}).exec()

    const course_delete = await Coursee.findOneAndDelete({
      _id: req.params.id,
    }).exec();
    res.send(course_delete);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error!!! on remove course");
  }
};

exports.getRoom = async (req, res) => {
  try {
    const room = await Room.find({}).exec();
    res.send(room);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! on list room");
  }
};
exports.getPlant = async (req, res) => {
  try {
    const plant = await Plant.find({}).exec();
    res.send(plant);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! on list plant");
  }
};

exports.uploadimg = async (req, res) => {
  try {
    const id = req.body.id;
    const filename = req.file.filename;

    // console.log(filename, id)
    const upload = await Coursee.findOneAndUpdate(
      { _id: id },
      { image: filename }
    );
    res.send(upload);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! on upload img");
  }
};

exports.updateimg = async (req, res) => {
  try {
    const id = req.body.id;
    const filename = req.file.filename;

    const img = await Coursee.findOne({ _id: id }).exec();
    console.log(img.image);

    await fs.unlink("./public/uploads/" + img.image, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("remove Success");
      }
    });

    const update = await Coursee.findOneAndUpdate(
      { _id: id },
      { image: filename }
    );
    res.send(update);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! on upload img");
  }
};

exports.uploadfile = async (req, res) => {
  try {
    const { id, file_number, topic_number } = req.body;
    const filename = req.file.filename;

    // console.log(id, file_number,topic_number  )

    const course = await Coursee.findOne({ _id: id }).exec();

    const type = course.topic[topic_number].file[file_number].type;
    const name = course.topic[topic_number].file[file_number].name;
    const filetype = course.topic[topic_number].file[file_number].filetype;

    const file_new = {
      type: type,
      name: name,
      filetype: filetype,
      filename: filename,
    };

    course.topic[topic_number].file[file_number] = file_new;

    console.log("course : === ", course.topic[topic_number].file[file_number]);

    const update = await Coursee.findOneAndUpdate(
      { _id: id },
      { topic: course.topic }
    ).exec();

    res.send("update");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! on upload img");
  }
};

exports.getCourseHome = async (req, res) => {
  try {
    const close = await Coursee.find({ statuscourse: true })
      .populate("teacher", "-password")
      .exec();
    const open = await Coursee.find({ statuscourse: false })
      .populate("teacher", "-password")
      .exec();

    res.send({ close: close, open: open });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! on getCourseHome");
  }
};

exports.updateCourseVideoAmount = async (req, res) => {
  try {
    const { id } = req.body;
    const { data } = req.body;
    console.log("-->>> ", req.body);
    await Coursee.findOneAndUpdate({ _id: id }, { $inc: data });

    res.send("update course data success");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! on update course data");
  }
};

exports.CourseSuccess = async (req, res) => {
  try {
    const { course, user, activity } = req.body;

    const Course = await Coursee.findOne({ _id: course }).exec();
    const Userr = await User.findOne({ _id: user }).exec();
    const teacher = await User.findOne({ _id: req.user.user_id }).exec();
    const Activity = await studentActivity.findOne({ _id: activity }).exec();

    const history = new History({
      result: req.body.result,
      score: Activity.score,
      maxscore: Activity.max_score,
      course: Course.name,
      teacher: req.user.user_id,
      student: user,
    });
    console.log(history);
    await history.save();

    for (let i = 0; i < Course.user.length; i++) {
      if (Course.user[i] == user) {
        Course.user.splice(i, 1);
      }
    }
    for (let i = 0; i < Course.member.length; i++) {
      if (Course.member[i].plant == Userr.plant) {
        Course.member[i].registerd = Course.member[i].registerd - 1;
      }
    }

    for (let i = 0; i < Userr.coursee.length; i++) {
      if (Userr.coursee[i] == course) {
        Userr.coursee.splice(i, 1);
      }
    }

    const activity_delete = await studentActivity
      .findOneAndDelete({ _id: Activity })
      .exec();

    const update_course = await Coursee.findOneAndUpdate(
      { _id: course },
      {
        user: Course.user,
        member: Course.member,
      }
    ).exec();

    // Userr.history.push(history._id)
    const update_user = await User.findOneAndUpdate(
      { _id: user },
      { coursee: Userr.coursee }
    ).exec();

    // const update_teacher = await User.findOneAndUpdate(
    //   { _id: req.user.user_id },
    //   { targetstudent: teacher.targetstudent + 1 }
    // )

    res.send("success");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! on CourseSuccess");
  }
};
