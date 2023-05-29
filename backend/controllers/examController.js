
const fs = require("fs");
const Exam = require('../models/exam')
const User = require("../models/user")
const Quiz = require("../models/quiz")
const Course = require("../models/course")

// POST: /create-exam
exports.createExam = async (req, res) => {
    try {
        const { head, body } = req?.body;
        const { user_id } = req?.user;

        // console.log("create: ", head, body)

        if (head !== undefined) {
            let quiz = null
            if (body !== undefined) {
                quiz = await Quiz.insertMany(body);
            }

            const data = {
                name: head.name,
                course: head.course,
                detail: head.detail,
                teacher: user_id,
                quiz: quiz,
            }

            const exam = await new Exam(data).save();

            await Course.findOneAndUpdate({ _id: head.course }, { exam: exam });

            return res.json({ data: exam });
        }
        // else if (body) {
        //     let quiz = null
        //     if (body !== undefined) {
        //         quiz = await Quiz.insertMany(body);
        //     }
        // }

        return res.status(400).json({ error: "Invalid data format" })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Unexpeccted error on create exam" })
    }
}

// GET: /get-exam/:id
exports.getExam = async (req, res) => {
    const allowField = ["quiz"]
    const allowedSearch = ["type"]
    try {

        let fields = req?.query?.field // field for populate
        let fetchs = req?.query?.fetch // fetch field after populate
        let selects = req?.query?.selects // select field in this model
        let search = req?.query?.search // search condition

        const seperator = new RegExp(",", 'g');

        // console.log(req?.query.fetch.replace(seperator, " "))
        if (fields) fields = fields.replace(seperator, " ")
        if (fetchs) fetchs = fetchs.replace(seperator, " ")
        if (selects) selects = selects.replace(seperator, " ")
        if (search) search = search.replace(seperator, " ")


        console.log(fields)
        console.log(fetchs)
        console.log(selects)
        console.log(search)


        // check role
        let searchParams = null
        let updateParams = null
        let option = { new: true }
        switch (req?.user?.role) {
            case "admin":
                searchParams = { _id: req.params.id }
                break;
            case "teacher":
                searchParams = { _id: req.params.id, teacher: user_id }
                break;
            case "student":
                searchParams = { _id: req.params.id }
                break;
            default:
                return res.status(404).json({ error: "This role does not exist in system" });
        }

        // validate search
        let searchArray = null
        if (search) searchArray = search.split(",")

        if (searchArray && Array.isArray(searchArray)) {
            if (searchArray.length > allowedSearch.length) return res.status(400).json({ error: "Invalid search parameter(s)" });
            if (searchArray.length > 0) {
                for (let i = 0; i < allowedSearch.length; i++) {
                    const searchSplited = searchArray[i].split(":")
                    const searchField = searchSplited[0]
                    const searchValue = searchSplited[1]
                    if (!allowedSearch.includes(searchField)) return res.status(400).json({ error: "Invalid search parameter(s)" });
                    else {
                        console.log(searchField, searchValue)
                        searchParams[searchField] = searchValue
                    }
                }
            }

        }
        else if (search) {
            if (!allowedSearch.includes(fields)) return res.status(400).json({ error: "Invalid search parameter(s)" });
        }

        // validate populateField
        let populateField = null
        if (fields && Array.isArray(fields)) {
            if (fields.length > allowField.length) return res.status(400).json({ error: "Invalid field parameter(s)" });
            if (fields.length > 1) {
                for (let i = 0; i < fields.length; i++) {
                    if (!allowField.includes(fields[i])) return res.status(400).json({ error: "Invalid field parameter(s)" });
                }
            }
            populateField = fields.join(" ")
        }
        else if (fields) {
            // console.log("===>", fields)
            if (!allowField.includes(fields)) return res.status(400).json({ error: "Invalid field parameter(s)" });
            populateField = fields
        }

        if (!searchParams) return res.status(500).json({ error: "Unexpected error on list courses" });

        // database thing
        let payload = null
        switch (req.user.role) {
            case "admin":
                payload =  await Exam.findOne(searchParams).populate(fields, fetchs)
                console.log(payload)
                if(payload) return res.json({ data: payload });
                return res.status(404).json({ error: "Exam with ID does not exsit"});
            case "teacher":
                payload = await Exam.findOne(searchParams).populate(fields)
                if(payload) return res.json({ data: payload });
                return res.status(404).json({ error: "Exam with ID does not exsit"});
            case "student":
                payload = await Exam.findOne(searchParams).populate(fields, fetchs+" -answer")
                if(payload) return res.json({ data: payload });
                return res.status(404).json({ error: "Exam with ID does not exsit"});
            default: return res.status(404).json({ error: "This role does not exist in system" });
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Unexpeccted error on get exam");
    }
}

// GET: /list-exam
exports.listExam = async (req, res) => {
    try {
        // const exam = await Exam.find({ teacher: req.user.user_id })
        switch (req?.user?.role) {
            case "admin":
                return res.json({
                    data: await Exam.find({})
                        .select("-createdAt -updatedAt -__v")
                        .populate({
                            path: "course",
                            select: "name -_id",
                        })
                });
                break;
            case "teacher":
                return res.json({
                    data: await Exam.find({ teacher: user_id })
                        .select("-createdAt -updatedAt -__v")
                        .populate({
                            path: "course",
                            select: "name -_id",
                        })
                });
                break;
            case "student":
                return res.status(403).json({ error: "Access denine for student" });
                break;
            default: return res.status(404).json({ error: "This role does not exist in system" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Unexpeccted error on list exam");
    }
}

// PUT: /update-exam/:id
exports.updateExam = async (req, res) => {
    try {
        const { head, body } = req.body
        const { user_id } = req?.user;

        console.log(head, body, req.params.id)

        const exam_data = await Exam.findOne({ _id: req.params.id }).select("quiz -_id")
        if (exam_data) {
            await Quiz.deleteMany({ _id: { $in: exam_data.quiz } })
        }


        let quiz = null
        if (body) {
            quiz = await Quiz.insertMany(body);
        }

        const data = {
            name: head.name,
            course: head.course,
            detail: head.detail,
            teacher: user_id,
            quiz: quiz
        }

        const exam = await Exam.findOneAndUpdate(
            { _id: req.params.id },
            data,
            { new: true },
        )

        res.json({ data: exam })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "Unexpeccted error on update exam" })
    }
}

// DELETE: /remove-exam/:id
exports.removeExam = async (req, res) => {
    try {
        const exam = await Exam.findOneAndRemove({ _id: req?.params?.id }).populate("quiz") // 

        let error_deleteFile = false
        if (exam) {
            await Quiz.deleteMany({ _id: { $in: exam?.quiz } })
            console.log(exam?.quiz)
            if (exam?.quiz) {
                exam?.quiz.forEach(item => {
                    if (item?.image?.name) {
                        fs.unlink(`./private/uploads/exam/${item.image.name}`,
                            (err) => {
                                if (err) {
                                    console.log(err)
                                    error_deleteFile = true
                                }
                            }
                        )
                    }
                })
            }
        }
        const course = await Course.findOneAndUpdate(
            { exam: req?.params?.id },
            { exam: null },
            { new: true },
        )

        if (error_deleteFile) return res.status(200).json({ data: { exam, course, message: "Cannot delete image in question" } });
        return res.json({ data: { exam, course } })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Unexpeccted error on remove exam" })
    }
}

// GET: /get-exam/:id/image
exports.getExamImage = async (req, res) => {
    try {
        const image_data = await Exam.findOne({ _id: req.params.id }).select("image -_id")

        res.sendFile(`private/uploads/${image_data.image.name}`, { root: "." }, (err) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ error: "Cannot get course image" });
            }
        });

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Unexpected error on get course image" });
    }
};


// ======================================================================================================
// exports.listquizUser = async (req, res) => {
//     try {
//         const {params} = req.params
//         const examiner = await Examiner.find({ examiner_id : params }).populate('quiz')
//         .exec()
//         // console.log("papapa :: ", params)
//         res.send(examiner)
//     } catch (err) {
//         console.log(err)
//         res.status(500).send('Server Error!!! on list quiz user')
//     }
// }







exports.updateQuiz = async (req, res) => {
    try {
        // const quiz = await Quiz.find({})
        //     .populate('teacher')
        //     .exec()
        console.log(req.body)


        const { head, body } = req.body
        // console.log(head,body)

        const course = await Quize.findOneAndUpdate(
            { _id: head._id }
            , {
                new: true,
                name: head.name,
                explanation: head.explanation,
                question: body,
                // attemp: head.attemp,
            },


        ).exec()


        res.send("update success")
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on update quiz')
    }
}

exports.listquizby = async (req, res) => {
    try {
        const quiz = await Quize.findOne({ _id: req.params.params }).exec()
        res.send(quiz)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on list quiz By')
    }
}

exports.getQuizByCourseID = async (req, res) => {
    try {
        console.log("THIS ID ", req.params.id)
        const quiz = await Quize.findOne({ course: req.params.id }).exec()
        console.log("quiz: ", quiz)
        res.send(quiz)

    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on list quiz get Quiz')
    }
}