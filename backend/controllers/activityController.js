const Activity = require('../models/activity')
const Exam = require('../models/exam')
const Quiz = require('../models/quiz')

const { validateQuery } = require('./util')

// POST: /create-activity
exports.createActivity = async (req, res) => {
    try {

        const activity = await new Activity({
            score_max: null,
            score_value: null,
            ans: null,
            process: null,
            completed: null,
            user: req.body.user,
            course: req.body.course,
        }).save()

        res.json({ data: activity })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Uncexpected error on create activity" })
    }
}

// GET: /list-activity?search=:?search&field=:field&fetch=:fetch&select=:select
exports.listActivity = async (req, res) => {
    const allowField = ["user", "course", "ans"]
    const allowedSearch = ["user", "course", "ans"]
    const allowedPops = ["user", "course", "exam", "plant", "_id", "name", "exam -_id", "ans", "image"]
    const allowedPropsField = ["path", "select", "populate"]
    const allowedSelect = ["ans"]
    const allowedFetch = ["-ans", "-__v"]
    try {
        const result = validateQuery(
            "get",
            "list activity",
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

        const activity_course = await Activity
            .find(result.options.searchParams, result.options.fetchParams)
            .populate(result.options.fieldParams ? result.options.fieldParams : result.options.subPropsParams)
            .select(result.options.selectParams)
        return res.json({ data: activity_course })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Uncexpected error on list activity" })
    }
}


// GET: /list-activity/course/:id
exports.listActivityCourse = async (req, res) => {
    try {
        const activity_course = await Activity.find({ course: req.params.id })

        res.json({ data: activity_course })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Uncexpected error on list activity by course ID" })
    }
}

// PUT: /update-activity/:id/progress
exports.updateActivityProgress = async (req, res) => {
    try {
        const activity = await Activity.findOneAndUpdate(
            { _id: req.params.id },
            { progress: req.body.progress },
            { new: true },
        )

        res.json({ data: activity })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Uncexpected error on update activity" })
    }
}

// GET: /get-activity/:id/progress
exports.getActivityProgress = async (req, res) => {
    try {
        const activity = await Activity.findOne(
            { _id: req.params.id },
        )

        res.json({ data: activity })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Uncexpected error on get activity progress" })
    }
}

// PUT: /update-activity/:id/score
exports.updateActivityScore = async (req, res) => {
    try {
        const activity = await Activity.findOne({ _id: req.params.id }).populate({
            path: "course",
            select: "exam",
            populate: {
                path: "exam",
                model: "exam",
                select: "quiz",
                populate: {
                    path: "quiz",
                    model: "quiz"
                }
            }
        })

        const quiz_data = activity?.course?.exam?.quiz;
        const quiz_length = quiz_data?.length;

        const answer_data = req?.body?.answer;
        const answer_length = answer_data?.length;

        if (!quiz_length) return res.status(404).json({ error: "Quiz is not exist" })
        if (quiz_length !== answer_length) return res.status(400).json({ error: "Length of answer and quiz is not the same" })

        let total_score = 0;
        for (let i = 0; i < quiz_length; i++) {
            if (quiz_data[i].answer === answer_data[i]) {
                total_score++;
            }
        }

        await Activity.findOneAndUpdate({ _id: req.params.id }, { score_value: total_score });

        const payload = {
            total_score: total_score,
        }

        return res.json({ data: payload });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Uncexpected error on update activity score" })
    }
}

// GET: /get-activity/:id/score
exports.getActivityScore = async (req, res) => {
    try {
        const activity = await Activity.findOne({ _id: req?.params?.id }).select("score_value -_id")

        return res.json({ data: activity });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Uncexpected error on get activity score" })
    }
}

// GET: /get-activity/:id?field=:field
exports.getActivity = async (req, res) => {
    const allowField = ["user", "course", "ans"]
    const allowedSearch = ["user", "course", "ans"]
    const allowedPops = ["user", "course", "exam", "plant", "_id", "name", "exam -_id", "ans", "image"]
    const allowedPropsField = ["path", "select", "populate"]
    const allowedSelect = ["ans"]
    const allowedFetch = ["-ans", "-__v"]
    try {
        const result = validateQuery(
            "get",
            "get activity",
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

        const activity_course = await Activity
            .findOne(result.options.searchParams, result.options.fetchParams)
            .populate(result.options.fieldParams ? result.options.fieldParams : result.options.subPropsParams)
            .select(result.options.selectParams)
        return res.json({ data: activity_course })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Uncexpected error on get activity by ID" })
    }
}

// PUT: /update-activity/:id/send-exam
exports.sendExam = async (req, res) => {
    try {

        res.send({ data: "You answer has been send" })
        const { answer } = req?.body
        const { user_id } = req.user
        const activity_id = req?.params?.id

        const database_activity = await Activity.findOne({ _id: activity_id }, "course -_id").populate({
            path: "course",
            select: "exam",
            populate: {
                path: "exam",
                select: "quiz -_id",
            }
        })
        const quiz = database_activity?.course?.exam?.quiz
        console.log(database_activity)

        if (!quiz) return console.log("Cannot find quiz for this activity")

        const quizList = await Quiz.find({ _id: quiz }, "")

        // console.log(quizList)

        let totalScore = 0;
        const answerKeys = Object.keys(answer)
        console.log(answer)
        for (let i = 0; i < answerKeys.length; i++) {
            // console.log(quizList[i].answer, answer[`${quizList[i]._id}`])
            if (quizList[i].answer == answer[`${quizList[i]._id}`]) {

                totalScore++;
            }
        }
        // console.log(activity_id)

        // console.log(await Activity.findOne({_id: activity_id}))

        const activity = await Activity.findOneAndUpdate(
            {
                _id: activity_id,
                user: user_id,
            },
            {
                score_value: totalScore,
                score_max: answerKeys.length,
                ans: answer,
            }
        )
        if (!activity) return console.log("Cannot find activity to update")
        // console.log(activity)
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Uncexpected error on update activity send exam" })
    }
}

exports.updateActivityResult = async (req, res) => {
    // TODO: implement update result of activity
    try {
        const activity_id = req?.params?.id
        const { user, result } = req?.body
        console.log("find this -> ",activity_id, user)

        if (!activity_id) return res.status(404).json({ error: "Activity not found" })

        const activity = await Activity.findOneAndUpdate({ _id: activity_id, user: user }, { result: result }, { new: true })
        

        if (!activity) return res.status(404).json({ error: "Activity of user not found" })
        return res.json({ data: activity })

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Uncexpected error on update activity result" })
    }
}

// =============================================================

exports.listScore = async (req, res) => {
    try {
        const {
            quiz,
        } = req.body
        const { user_id } = req.user

        const quize = await Quiz.findOne({ _id: quiz })
            .populate('course')
            .exec()

        const activity = await studentActivity.findOne(
            {
                coursee: quize.course._id,
                user: user_id
            }
        ).exec()

        // console.log("---->",examiners)
        // const query_quiz = await Quiz.findOne({_id: quiz}).exec()

        // let payload = []
        // examiners.forEach((examiner, index) => {
        //     payload.push({key: index+1, score: activity, max_score: query_quiz.question.length})    
        // });
        // console.log(payload)

        res.send(activity)

    }
    catch (err) {
        console.log("fail to list score");
        res.status(500).json({ error: "fail to list score" })
    }
}


exports.getAccessNumber = async (req, res) => {
    try {
        const {
            quiz,
        } = req.body

        const { user_id } = req.user

        const quize = await Quiz.findOne({ _id: quiz })
            .populate('course')
            .exec()

        const activity = await studentActivity.findOne(
            {
                coursee: quize.course._id,
                user: user_id
            }
        ).exec()

        // console.log(!!!activity.score)
        // res.send("ok")
        // console.log(!activity.score,activity.score)
        if (activity.score == undefined) {

            return res.send({
                quiz_active: true,
                // access_number: 0,
                maximum_access: quize.attemp,
            })
        }
        else {

            // if (examiners.length < quiz_access_number.attemp) {
            //     return res.send({
            //         quiz_active: true,
            //         // access_number: examiners.length,
            //         maximum_access: quize.attemp,
            //     })
            // }
            return res.send({
                quiz_active: false,
                // access_number: examiners.length,
                maximum_access: quize.attemp,
            })
        }

    }
    catch (err) {
        console.log(err, "fail to get access number");
        res.status(500).json({ error: "fail to get access number" })

    }
}

exports.updateProcess = async (req, res) => {
    try {
        const { course, process, completed } = req.body;
        const { user_id } = req.user
        console.log("process -> ", process, user_id, course)
        console.log("process data: ", process)
        if (!process) {
            console.log("HI ITS ME")
            const data = await studentActivity.findOneAndUpdate({ user: user_id, coursee: course }, { completed: completed }).exec()
            console.log("after update", data)
        }
        else {
            await studentActivity.findOneAndUpdate({ user: user_id, coursee: course }, { process: process, completed: completed }).exec()
        }
        res.send("update process success")
    }
    catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on update process')
    }
}

exports.getProcess = async (req, res) => {
    try {
        const { course } = req.body;
        const { user_id } = req.user
        // console.log("process -> ",process, user_id)
        const student_activity = await studentActivity.findOne({ user: user_id, coursee: course }).exec()
        res.send(student_activity)
    }
    catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on update process')
    }
}
