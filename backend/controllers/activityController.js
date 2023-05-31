const Activity = require('../models/activity')
const Exam = require('../models/exam')
const Quiz = require('../models/quiz')
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
    const allowField = ["user", "course"]
    const allowedSearch = ["user", "course"]
    let allowedProps = ["user", "course", "exam", "plant", "_id", "name", "exam -_id"]
    const allowedPropsField = ["path", "select", "populate"]
    try {

        let pops = req?.query?.pops
        let fields = req?.query?.field // field for populate
        let fetchs = req?.query?.fetch // fetch field after search
        let selects = req?.query?.selects // select field in this model
        let search = req?.query?.search // search condition

        if (pops && fields) return res.status(400).json({ error: "Invalid query parameter pops and field cannot use at the same time" })

        const seperator = new RegExp(",", 'g');
        // if (pops) pops = pops.replace(seperator, " ")
        if (fields) fields = fields.replace(seperator, " ")
        if (fetchs) fetchs = fetchs.replace(seperator, " ")
        if (selects) selects = selects.replace(seperator, " ")
        if (search) search = search.replace(seperator, " ")

        console.log(pops)
        console.log(fields)
        console.log(fetchs)
        console.log(selects)
        console.log(search)


        // check role
        let searchParams = null
        let updateParams = null
        let option = { new: true }

        const user_id = req?.user?.user_id
        switch (req?.user?.role) {
            case "admin":
                searchParams = {}
                break;
            case "teacher":
                searchParams = { user: user_id }
                allowedProps = []
                break;
            case "student":
                searchParams = { user: user_id }
                allowedProps = []
                break;
            default:
                return res.status(404).json({ error: "This role does not exist in system" });
        }

        // validate search
        let searchArray = null
        if (search) searchArray = search.split(",")
        if (searchArray && Array.isArray(searchArray)) {
            if (searchArray.length > allowedSearch.length) return res.status(400).json({ error: "Invalid search parameter(s)" });

            if (searchArray.length > 1) {
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
            else if (searchArray.length === 1) {
                const searchSplited = searchArray[0].split(":")
                searchParams[searchSplited[0]] = searchSplited[1]
            }
            else {
                return res.status(400).json({ error: "Invalid search parameter(s)" });
            }
        }
        else if (search) {
            if (!allowedSearch.includes(fields)) return res.status(400).json({ error: "Invalid search parameter(s)" });
        }
        if (!searchParams) return res.status(500).json({ error: "Unexpected error on list courses" });


        // validate fields
        let populateField = null

        if (fields) {
            // normal populate
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
                if (!allowField.includes(fields)) return res.status(400).json({ error: "Invalid field parameter(s)" });
                populateField = fields
            }
        }
        else if (pops) {
            // sub-populate
            let popsParams = []
            let popsArray = null
            if (pops) popsArray = pops.split(",")
            if (popsArray && Array.isArray(popsArray)) {
                if (popsArray.length > allowedProps.length) return res.status(400).json({ error: "Invalid pops parameter(s)" });

                for (let i = 0; i < popsArray.length; i++) {
                    let popsLayers = popsArray[i].split("$")

                    console.log(popsLayers)

                    let popsObject = {}
                    for (let j = 0; j < popsLayers.length; j++) {
                        const splitedData = popsLayers[j].split(":")
                        const fieldData = splitedData[0]
                        const valueData = splitedData[1]

                        console.log(allowedProps, valueData)

                        if (req?.user.role !== "admin") {
                            if (!allowedProps.includes(valueData)) return res.status(400).json({ error: "Invalid pops value parameter(s)" });
                            if (!allowedPropsField.includes(fieldData)) return res.status(400).json({ error: "Invalid pops field parameter(s)" });
                        }

                        if (fieldData === "populate") {
                            popsObject[fieldData] = { path: valueData }
                        }
                        else {
                            popsObject[fieldData] = valueData
                        }
                    }
                    popsParams.push(popsObject)
                }
                populateField = popsParams
            }
            else {
                return res.status(400).json({ error: "Invalid search parameter(s)" });
            }
        }



        // populateField
        // database thing
        const activity_course = await Activity.find(searchParams, fetchs).populate(populateField).select(selects)
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
    try {
        const field = req?.query?.field.replace(",", " ")
        // const field = req?.params?.field
        // console.log(field)
        const activity = await Activity.findOne({ _id: req?.params?.id }).select(`${field} -_id`)


        if (activity[`${field}`] === undefined) return res.status(404).json({ error: `Cannot find field name ${field}` })
        return res.json({ data: activity });
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

        const quizList = await Quiz.find({ _id: quiz  }, "")

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
