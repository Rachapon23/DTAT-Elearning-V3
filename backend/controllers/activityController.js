const Activity = require('../models/activity')
const Exam = require('../models/exam')
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



// GET: /list-activity/course/:id
exports.listActivityCourse = async (req, res) => {
    try {
        const activity_course = await Activity.find({ course: req.params.id })

        res.json({ data: activity_course })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Uncexpected error on create activity" })
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
        res.status(500).json({ error: "Uncexpected error on create activity" })
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
        res.status(500).json({ error: "Uncexpected error on create activity" })
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
        return res.status(500).json({ error: "Uncexpected error on create activity" })
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
        return res.status(500).json({ error: "Uncexpected error on create activity" })
    }
}

// GET: /get-activity/:id?field=:field
exports.getActivity = async (req, res) => {
    try {
        const field = req?.query?.field.replace(",", " ")
        // const field = req?.params?.field
        // console.log(field)
        const activity = await Activity.findOne({ _id: req?.params?.id }).select(`${field} -_id`)
        
        
        if(activity[`${field}`] === undefined) return res.status(404).json({ error: `Cannot find field name ${field}` })
        return res.json({ data: activity });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Uncexpected error on create activity" })
    }
}


// =============================================================
exports.sendQuizStudent = async (req, res) => {
    try {
        const {
            ans,
            quiz,
        } = req.body
        const { fisrtname, user_id } = req.user

        const quize = await Quiz.findOne({ _id: quiz })
            .populate('course')
            .exec()

        let totalScore = 0;
        for (let i = 0; i < ans.length; i++) {
            if (quize.question[i].ans == ans[i]) {
                totalScore++;
            }
        }

        const activity = await studentActivity.findOneAndUpdate(
            {
                coursee: quize.course._id,
                user: user_id
            }, {
            score: totalScore,
            max_score: quize.question.length,
            ans: ans,
        }
        ).exec()


        // console.log(activity)

        res.send(activity)
    }
    catch (err) {
        console.log("fail to list score");
        res.status(500).json({ error: "fail to sendQuizStudent" })
    }
}

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
