const fs = require("fs");
const Course = require("../models/course");
const Room = require("../models/room");
const Plant = require("../models/plant");
const Calendar = require("../models/calendar");
const User = require("../models/user");
const Topic = require("../models/topic");
const Activity = require("../models/activity");
const Condition = require("../models/condition");

const { validateQuery } = require("./util");

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

    // create course
    const course = await new Course({
      name: "", //head.name,
      detail: "", //head.detail,
      room: null, //head.room,
      video: null, //head.video,
      type: true, //head.type,
      enabled: null, //head.enabled,
      teacher: user_id, //head.teacher,
      calendar: null,
      exam: null,
      topic: null,
      image: {
        original_name: null,
        name: null,
      },
      condition: null, //condition,
    }).save();

    // const course = await new Course({
    //   // name: name,
    //   // detail: detail,
    //   // type: type,
    //   // enabled: false,
    //   teacher: user_id,
    // }).save();

    res.json({ data: course });
  } catch (err) {
    console.log("fail to create the course : ", err);
    res.status(500).json({ error: "Unexpected error on create course" });
  }
};

// GET: /get-course/:id
exports.getCourse = async (req, res) => {
  const allowField = ["calendar"]
  const allowedSearch = ["_id"]
  const allowedProps = ["condition", "plant", "plant maximum", "teacher", "firstname lastname -_id", "firstname lastname"]
  const allowedPropsField = ["path", "populate", "select"]
  const allowedSelect = ["firstname", "lastname"]
  const allowedFetch = ["name", "detail", "image", "condition", "teacher"]
  try {
    console.log(req?.params?.id)
    const result = validateQuery(
      "get",
      "get course",
      req?.user?.role,
      null,
      false,//req?.user?.role === "admin",
      null,
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
          fields: allowedProps,
        },
        selects: allowedSelect,
        fetchs: allowedFetch,

      },
      false
    )

    if (!result.success) return res.status(result.code).json({ error: result.message })

    const course = await Course
      .findOne(result.options.searchParams, result.options.fetchParams)
      .populate(result.options.fieldParams ? result.options.fieldParams : result.options.subPropsParams)
      .select(result.options.selectParams)
    return res.json({ data: course })
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Unexpected error on get course" });
  }

};

// GET: /list-course
exports.listCourse = async (req, res) => {
  const allowField = ["condition", "room", "teacher", "exam"]
  const allowedSearch = ["type"]
  const allowedPops = []
  const allowedPropsField = ["path", "select", "populate"]
  const allowedSelect = ["ans", "name", "detail", "image", "type"]
  const allowedFetch = []
  try {
    const result = validateQuery(
      "get",
      "list course",
      req?.user?.role,
      null,
      req?.user?.role === "admin",
      null,
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

    const courses = await Course
      .find(result.options.searchParams, result.options.fetchParams)
      .populate(result.options.fieldParams ? result.options.fieldParams : result.options.subPropsParams)
      .select(result.options.selectParams)
    return res.json({ data: courses })

  }
  catch (err) {
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
    await Condition.deleteMany({ course: req.params.id });
    fs.unlink(`./private/uploads/course/${courses.image.name}`, (err) => {
      if (err) {
        console.log(err);
        error_deleteFile = true;
      }
    });
    await Calendar.findOneAndDelete({_id:courses.calendar})
    const topic = await Topic.find({ course: req.params.id });
    await topic.forEach(async (item, index) => {
      await item.file.forEach(async (ttem, ddex) => {
        await fs.unlink(`./private/uploads/topic/${ttem.name}`, (err) => {
          if (err) {
            console.log(err);
            error_deleteFile = true;
          }
        });
      })
    })
    res.json("{ data: courses }");
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
    // console.log(req.body)

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
      fs.unlink(
        `./${req.body.upload_type}/uploads/${image_data.image.name}`,
        (err) => {
          if (err) {
            if (req.body.upload_type === "public") {
              fs.unlink(`./private/uploads/${image_data.image.name}`, (err) => {
                if (err) error_deleteFile = true;
                else error_deleteFile = false;
              });
            } else error_deleteFile = false;

            if (req.body.upload_type === "private") {
              fs.unlink(`./public/uploads/${image_data.image.name}`, (err) => {
                if (err) error_deleteFile = true;
                else error_deleteFile = false;
              });
            } else error_deleteFile = false;

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
      case "teacher":
        return res.json({
          data: (await Course.find({ teacher: user_id })).length,
        });
      case "student":
        return res.status(403).json({ error: "Access denine for student" });
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
        console.log(await Course.find({}));
        return res.json({ data: await Course.find({ exam: null }) });
      case "teacher":
        return res.json({
          data: await Course.find({ teacher: user_id, exam: null }),
        });
      case "student":
        return res.status(403).json({ error: "Access denine for student" });
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

        // console.log("user plant: ", searchedCourse.map((item) => item.activity.map((aitem) => aitem.user.firstname)))
        // console.log("curse plant: ", searchedCourse.filter((fitem) => fitem.condition).map((item) => item.condition.map((citem) => citem.plant.name)))
        const payload = searchedCourse
          .filter((fitem) => fitem.condition && Array.isArray(fitem.condition) && fitem.condition.length > 0)
          .map(
            (item) => (
              {
                name: item.name,
                plant: item.condition?.map((citem) => citem.plant.name),
                plant_amount: item.condition?.map((amount) => amount.maximum),
                plant_current: item.condition?.map((citem) => item.activity.map((aitem) => {
                  if (citem.plant.name === aitem.user.plant.name && (aitem.result === 2 || aitem.result === 1)) {
                    console.log("match: ", citem.plant.name, aitem.user.plant.name)
                    console.log("result: ", aitem.result)
                    console.log("logic: ", citem.plant.name === aitem.user.plant.name && (aitem.result === 2 || aitem.result === 1) ? 1 : 0)
                  }
                  return citem.plant.name === aitem.user.plant.name && (aitem.result === 2 || aitem.result === 1) ? 1 : 0
                }).reduce((prev, curr) => prev + curr, 0)),
                current: item.activity.map((aitem) => aitem.result === 2 || aitem.result === 1 ? 1 : 0).reduce((prev, curr) => prev + curr, 0),
                maximum: item.condition.map((amount) => amount.maximum).reduce((prev, curr) => prev + curr, 0),
              }
            )
          )
        console.log(payload)
        return res.json({ data: payload });
      case "teacher":
        return res.json({ data: await Course.find({ teacher: user_id }).populate("condition") });
      case "student":
        return res.status(403).json({ error: "Access denine for student" });
      default:
        return res.status(404).json({ error: "This role does not exist in system" });
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unexpected error on list courses" });
  }
};

// ==============================================================================================================
