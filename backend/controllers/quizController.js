
const Quize = require('../models/quize')
const User = require("../models/user")
const Course = require("../models/course")

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
exports.getQuiz = async (req, res) => {
    try {
        console.log(req.params.id)
        const quiz = await Quize.findOne({ _id: req.params.id }).exec()
        res.send(quiz)

    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on list quiz get Quiz')
    }
}

exports.remove = async (req, res) => {
    try {
        // console.log(req.params)
        const quiz = await Quize.findOneAndRemove({ _id: req.params.params }).exec()
        res.send(quiz)

    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on remove Quiz')
    }
}
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


exports.createQuiz = async (req, res) => {
    try {

        // const validated_result = await QuizValidation.createQuizValidate(req);
        // if(!validated_result.valid) return res.status(400).send(validated_result);

        const {head,body} = req.body
        // console.log(head,body)

        const quiz = new Quize({
            name:head.name,
            explanation:head.explanation,
            question:body,
            // attemp: head.attemp,
            teacher:head.teacher,
            course: head.course,
        })
        await quiz.save()
        await Course.findOneAndUpdate({_id: head.course}, {quiz: quiz._id})

        res.send({quiz: quiz, msg:'create success'})
      
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on createQuiz')
    }
}
exports.listQuiz = async (req, res) => {
    try {
        const {user_id} = req.user;
        const user = await User.findOne({_id: user_id}).exec();

        if(user.role === "admin") {
            const quizzs = await Quize.find({}).populate("course", "name").exec();
            return res.send(quizzs);
        }
        else {
            const quizzs = await Quize.find({teacher:user_id}).populate("course", "name").exec();
            return res.send(quizzs);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error!!! on listQuiz');
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
        console.log("THIS ID ",req.params.id)
        const quiz = await Quize.findOne({ course: req.params.id }).exec()
        console.log("quiz: ",quiz)
        res.send(quiz)

    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on list quiz get Quiz')
    }
}