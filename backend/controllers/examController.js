
const Exam = require('../models/exam')
const User = require("../models/user")
const Quiz = require("../models/quiz")
const Course = require("../models/course")

// POST: /create-exam
exports.createExam = async (req, res) => {
    try {
        const { head, body } = req?.body;
        const { user_id } = req?.user;

        if (head !== undefined) {
            let quiz = null
            if (body !== undefined) {
                quiz = await Quiz.insertMany(body);
            }

            const data = quiz ?
                {
                    name: head.name,
                    course: head.course,
                    detail: head.detail,
                    teacher: user_id,
                    quiz: quiz,
                }
                :
                {
                    name: head.name,
                    course: head.course,
                    detail: head.detail,
                    teacher: user_id,
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
    try {
        switch (req.user.role) {
            case "admin":
                return res.json({ data: await Exam.findOne({ _id: req.params.id }).populate("quiz") });
                break;
            case "teacher":
                return res.json({ data: await Exam.findOne({ _id: req.params.id, teacher: user_id }) });
                break;
            case "student":
                return res.json({ data: await Exam.findOne({ _id: req.params.id }) });
                break;
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

        // console.log(head, body)

        const exam_data = await Exam.findOne({ _id: req.params.id }).select("quiz -_id")
        console.log(exam_data.quiz)
        if(exam_data.quiz.length > 0) {
            await Quiz.deleteMany({}, exam_data.quiz)
        }


        let quiz = null
        if (body) {
            quiz = await Quiz.insertMany(body);
        }

        const data = quiz ?
            {
                name: head.name,
                course: head.course,
                detail: head.detail,
                teacher: head.teacher,
                quiz: quiz
            }
            :
            {
                name: head.name,
                course: head.course,
                detail: head.detail,
                teacher: head.teacher,
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
        const exam = await Exam.findOneAndRemove({ _id: req?.params?.id }) // 
        

        await Quiz.deleteMany({}, exam?.quiz)
        const course = await Course.findOneAndUpdate(
            { exam: req?.params?.id },
            { exam: null },
            { new: true },
        )


        // .exec((err, res) => {
        //     return res.json({ warning: { exam, message: "Cannot delete quiz data of exam" } })
        // })

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