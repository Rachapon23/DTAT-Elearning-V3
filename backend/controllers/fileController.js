const Exam = require("../models/exam");
const Course = require("../models/course");
const Topic = require("../models/topic");
const fs = require("fs");

const allowedField = {
  exam: Exam,
  course: Course,
};

// image and file when create will use this API together
// when get file and image will use seperate API due to field in DB and this will made display between image and file in frontend much easier

// POST: /create-file/private/:field
exports.createPrivateFile = async (req, res) => {
  try {
    const { field } = req.body;

    if (field === "exam") {
      // this API take action like acknowledge from server thst file has been created
      // real action of save file to backend are in middleware
      const payload = {
        name: req?.body?.name,
        original_name: req?.body?.original_name,
        // upload_type: req?.body?.upload_type,
      };
      res.json({ data: payload });
    } else if (field === "course") {
      const image = {
        name: req?.body?.name,
        original_name: req?.body?.original_name,
      };
      const course = await Course.findOneAndUpdate(
        { _id: req.body.course_id },
        { image: image }
      );
      res.json(Course);
    } else if (field === "topic") {
      const topic = await Topic.findOne({ _id: req.body.topic_id });
      topic.file.push({
        name: req?.body?.name,
        original_name: req?.body?.original_name,
        file_type:req.file.mimetype
      });
      await Topic.findOneAndUpdate(
        { _id: req.body.topic_id },
        { file: topic.file }
      );
      res.json(topic);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Server Error!!! on create file" });
  }
};
// DELETE: /delete-file/course/:id
exports.deleteImageCourse = async (req, res) => {
  try {
    const image_empty = {
      original_name: null,
      name: null,
    };
    const course = await Course.findOneAndUpdate(
      { _id: req.params.id },
      { image: image_empty }
    );
    fs.unlink(`./private/uploads/course/${course.image.name}`, (err) => {
      if (err) {
        console.log(err);
        error_deleteFile = true;
      }
    });
    res.json(course);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Server Error!!! on delete file" });
  }
};

// GET: /get-image/private/:field?<file | id>=<value>
exports.getPrivateFieldImage = async (req, res) => {
  try {
    const field = req?.params?.field;
    if (!field) {
      return res.status(500).json({ error: "Cannot get private field image" });
    }

    if (req?.query?.id) {
      let hasError = false;
      const image_data = await allowedField[field]
        .findOne({ _id: id })
        .select("image -_id");
      res.sendFile(
        `private/uploads/${field}/${image_data?.image?.name}`,
        { root: "." },
        (err) => {
          if (err) {
            console.log(err);
            hasError = true;
          }
        }
      );
      if (hasError)
        return res
          .status(500)
          .json({ error: "Cannot get private field image by ID" });
    } else if (req?.query?.file) {
      const file = req?.query?.file;
      let hasError = false;
      res.sendFile(`private/uploads/${field}/${file}`, { root: "." }, (err) => {
        if (err) {
          console.log(err);
          hasError = true;
        }
      });
      if (hasError)
        return res
          .status(500)
          .json({ error: "Cannot get private field image by name" });
    } else {
      return res.status(500).json({
        error: "Cannot get private field image (invalid query parameter)",
      });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ error: "Server Error!!! on get private field image" });
  }
};

// POST: /create-file/public/:field
exports.createPublicFile = (req, res) => {
  try {
    // this API take action like acknowledge from server thst file has been created
    // real action of save file to backend are in middleware
    // console.log(req?.body)
    const payload = {
      name: req?.body?.name,
      original_name: req?.body?.original_name,
      // upload_type: req?.body?.upload_type,
    };
    res.json({ data: payload });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Server Error!!! on create file" });
  }
};

// exports.getPublicFieldImage = async (req, res) => {
//     try {
//         const field = req?.params?.field
//         if (!field) {
//             return res.status(500).json({ error: "Cannot get public field image" });
//         }

//         if (req?.query?.id) {
//             let hasError = false
//             const image_data = await allowedField[field].findOne({ _id: id }).select("image -_id")
//             res.sendFile(`public/uploads/${field}/${image_data?.image?.name}`, { root: "." }, (err) => {
//                 if (err) {
//                     console.log(err)
//                     hasError = true
//                 }
//             });
//             if (hasError) return res.status(500).json({ error: "Cannot get public field image by ID" });
//         }
//         else if (req?.query?.file) {
//             const file = req?.query?.file
//             let hasError = false
//             res.sendFile(`public/uploads/${field}/${file}`, { root: "." }, (err) => {
//                 if (err) {
//                     console.log(err)
//                     hasError = true
//                 }
//             });
//             if (hasError) return res.status(500).json({ error: "Cannot get public field image by name" });
//         }
//         else {
//             return res.status(500).json({ error: "Cannot get public field image (invalid query parameter)" });
//         }

//     }
//     catch (err) {
//         console.log(err);
//         res.status(500).send({ error: "Server Error!!! on get public field image" });
//     }
// }
