const fs = require("fs");
const Course = require("../models/course");
const Room = require("../models/room");
const Plant = require("../models/plant");
const Calendar = require("../models/calendar");
const User = require("../models/user");
const Topic = require("../models/topic");
const Activity = require("../models/activity");
const Condition = require("../models/condition");
const Exam = require("../models/exam")
const Quiz = require("../models/quiz")

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
      condition: [], //condition,
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
    if (err?.code === 11000) {
      return res.status(400).json({ error: "Course name cannot be empty, change name before create a new one" });
    }
    res.status(500).json({ error: "Unexpected error on create course" });
  }
};

// GET: /get-course/:id
exports.getCourse = async (req, res) => {
  const allowField = ["calendar"]
  const allowedSearch = ["_id"]
  const allowedProps = ["condition", "plant", "plant maximum current", "teacher", "firstname lastname -_id", "firstname lastname _id"]
  const allowedPropsField = ["path", "populate", "select"]
  const allowedSelect = ["firstname", "lastname"]
  const allowedFetch = ["name", "detail", "image", "condition", "teacher", "type"]
  try {
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
      false,
    )

    // console.log(result)
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
      false,//req?.user?.role === "admin",
      {
        teacher: {
          search: { data: { teacher: req?.user?.user_id } } // override any request
        }
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
      true
    )
    console.log(result)
    if (!result.success) return res.status(result.code).json({ error: result.message })

    const courses = await Course
      .find(result.options.searchParams, result.options.fetchParams)
      .populate(result.options.fieldParams ? result.options.fieldParams : result.options.subPropsParams)
      .select(result.options.selectParams)
    return res.json({ data: courses })

  }
  catch (err) {
    console.log(err);
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
    fs.unlink(`./private/uploads/course/${courses?.image?.name}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
    await Calendar.findOneAndDelete({ _id: courses.calendar })
    const topic = await Topic.find({ course: req.params.id });
    await topic.forEach(async (item) => {
      await item.file.forEach(async (ttem) => {
        await fs.unlink(`./private/uploads/topic/${ttem.name}`, (err) => {
          if (err) {
            console.log(err);
          }
        });
      })
      await Topic.findOneAndDelete({ _id: item._id })
    })

    const exam = await Exam.findOneAndDelete({ _id: courses.exam }).populate("quiz", "_id image")
    if (Array.isArray(exam?.quiz)) {
      exam.quiz.forEach(async (item) => {
        if (item.image) {
          fs.unlink(`./private/uploads/exam/${item.image.name}`, (err) => {
            if (err) {
              console.log(err);
            }
          });
        }
        await Quiz.findOneAndDelete({ _id: item._id })
      })
    }

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
          data: (await Course.find({ teacher: req?.user?.user_id })).length,
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

// GET: /list-course/sp/wo/quiz?course=<course_id>
exports.listCourseWoQuiz = async (req, res) => {
  try {
    switch (req?.user?.role) {
      case "admin":
        return res.json({ data: await Course.find({ exam: null }) });
      case "teacher":
        return res.json({
          data: await Course.find({ teacher: req?.user?.user_id, exam: null }),
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

        // const searchedActivity = await Activity.find({}).populate("user")
        // console.log(searchedActivity.map((item) =>{
        //   if(item.completed && item.user) return item.user
        //   else return 0
        // }))

        // console.log("user plant: ", searchedCourse.map((item) => item.activity.map((aitem) => aitem.user.firstname)))
        // console.log("curse plant: ", searchedCourse.filter((fitem) => fitem.condition).map((item) => item.condition.map((citem) => citem.plant.name)))
        // console.log("test: ", searchedCourse
        //   .filter((fitem) => fitem.condition && Array.isArray(fitem.condition) && fitem.condition.length > 0)
        //   .map((item) => item)
        // )
        let plant = {}
        let plant_amount = {}
        let plant_current = {}
        const totalStudent = searchedCourse
          .filter((fitem) => fitem.condition && Array.isArray(fitem.condition) && fitem.condition.length > 0)
          .map(
            (item) => (
              {
                name: item.name,
                plant: item.condition?.map((citem) => citem.plant.name),
                plant_amount: item.condition?.map((amount) => amount.maximum),
                plant_current: item.condition?.map((citem) => {
                  if (!plant[`${citem.plant.name}`]) {
                    plant[`${citem.plant.name}`] = {
                      plant_amount: 0,
                      plant_current: 0
                    }
                  }
                  if (!plant_amount[`${citem.plant.name}`]) {
                    plant_amount[`${citem.plant.name}`] = 0
                  }
                  plant_amount[`${citem.plant.name}`] = plant_amount[`${citem.plant.name}`] + citem?.maximum
                  if (!plant_current[`${citem.plant.name}`]) {
                    plant_current[`${citem.plant.name}`] = 0
                  }

                  plant[`${citem.plant.name}`].plant_amount = plant_amount[`${citem.plant.name}`]
                  plant[`${citem.plant.name}`].plant_current = plant_current[`${citem.plant.name}`]

                  return item.activity.map((aitem) => {
                    if (citem.plant.name === aitem.user.plant.name && (aitem.result === 2 || aitem.result === 1)) {
                      plant_current[`${citem.plant.name}`] = plant_current[`${citem.plant.name}`] + 1
                    }
                    return citem.plant.name === aitem.user.plant.name && (aitem.result === 2 || aitem.result === 1) ? 1 : 0
                  })

                }).reduce((prev, curr) => prev + curr, 0),
                current: item.activity.map((aitem) => aitem.result === 2 || aitem.result === 1 ? 1 : 0).reduce((prev, curr) => prev + curr, 0),
                maximum: item.condition.map((amount) => amount.maximum).reduce((prev, curr) => prev + curr, 0),
              }
            )
          )



        // searchedCourse
        //   .filter((fitem) => fitem.condition && Array.isArray(fitem.condition) && fitem.condition.length > 0)
        //   .map(
        //     (item) => {

        //       for (let i = 0; i < item.condition.length; i++) {
        //         if (!plant[`${item.condition[i].plant.name}`]) {
        //           plant[`${item.condition[i].plant.name}`] = {
        //             plant_amount: 0,
        //             plant_current: 0
        //           }
        //         }

        //         if (!plant_amount[`${item.condition[i].plant.name}`]) {
        //           plant_amount[`${item.condition[i].plant.name}`] = 0
        //         }
        //         plant_amount[`${item.condition[i].plant.name}`] = plant_amount[`${item.condition[i].plant.name}`] + item.condition[i]?.maximum

        //         if (!plant_current[`${item.condition[i].plant.name}`]) {
        //           plant_current[`${item.condition[i].plant.name}`] = 0
        //         }
        //         plant_current[`${item.condition[i].plant.name}`] = plant_current[`${item.condition[i].plant.name}`] + item.condition[i]?.current

        //         plant[`${item.condition[i].plant.name}`].plant_amount = plant_amount[`${item.condition[i].plant.name}`]
        //         plant[`${item.condition[i].plant.name}`].plant_current = plant_current[`${item.condition[i].plant.name}`]

        //       }
        //     }
        //   )


        const payload = { totalStudent, plant }
        // console.log(totalStudent)
        // console.log(plant)
        return res.json({ data: payload });
      case "teacher":
        const searchedCourseTeacher = await Course.find({ teacher: req?.user?.user_id })
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

        console.log(searchedCourseTeacher.filter((fitem) => fitem.condition && Array.isArray(fitem.condition) && fitem.condition.length > 0).map(
          (item) => item.condition?.map((citem) => item?.activity?.map((aitem) => citem.plant.name === aitem.user.plant.name && (aitem.result === 2 || aitem.result === 1) ? 1 : 0).reduce((prev, curr) => prev + curr, 0) ) )
        )
        let tplant = {}
        let tplant_amount = {}
        let tplant_current = {}
        const tTotalStudent = searchedCourseTeacher
          .filter((fitem) => fitem.condition && Array.isArray(fitem.condition) && fitem.condition.length > 0)
          .map(
            (item) => (
              {
                name: item.name,
                plant: item.condition?.map((citem) => citem.plant.name),
                plant_amount: item.condition?.map((amount) => amount.maximum),
                plant_current: item.condition?.map((citem) => {
                  if (!tplant[`${citem.plant.name}`]) {
                    tplant[`${citem.plant.name}`] = {
                      plant_amount: 0,
                      plant_current: 0
                    }
                  }
                  if (!tplant_amount[`${citem.plant.name}`]) {
                    tplant_amount[`${citem.plant.name}`] = 0
                  }
                  tplant_amount[`${citem.plant.name}`] = tplant_amount[`${citem.plant.name}`] + citem?.maximum
                  if (!tplant_current[`${citem.plant.name}`]) {
                    tplant_current[`${citem.plant.name}`] = 0
                  }

                  tplant[`${citem.plant.name}`].plant_amount = tplant_amount[`${citem.plant.name}`]
                  tplant[`${citem.plant.name}`].plant_current = tplant_current[`${citem.plant.name}`]

                  return (
                    item?.activity?.map((aitem) => {
                      if (citem?.plant?.name === aitem?.user?.plant?.name && (aitem.result === 2 || aitem.result === 1)) {
                        tplant_current[`${citem.plant.name}`] = tplant_current[`${citem.plant.name}`] + 1
                      }
                      return citem.plant.name === aitem.user.plant.name && (aitem.result === 2 || aitem.result === 1) ? 1 : 0
                    }).reduce((prev, curr) => prev + curr, 0)
                  )
                }),
                current: item.activity.map((aitem) => aitem.result === 2 || aitem.result === 1 ? 1 : 0).reduce((prev, curr) => prev + curr, 0),
                maximum: item.condition.map((amount) => amount.maximum).reduce((prev, curr) => prev + curr, 0),
              }
            )
          )
        const payloadTeacher = { totalStudent: tTotalStudent, plant: tplant }
        console.log(tTotalStudent)
        return res.json({ data: payloadTeacher });
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
