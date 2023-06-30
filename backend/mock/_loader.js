exports.loadData = async () => {
    const { loadPlant } = require("./plant");
    const { loadRole } = require("./role");
    const { loadDepartment } = require("./department");
    const { loadRoom } = require("./room");
    const { loadUser } = require("./user")
    const { loadCourse, getCourse } = require("./course");
    const { loadActivity, getActivity } = require("./activity");
    const { loadCondition, getCondition } = require("./condition");
    const { loadExam, getExam } = require("./exam");
    const { loadQuiz } = require("./quiz");
    const { loadTopic, getTopic } = require("./topic");

    await loadPlant()
    await loadRole()
    await loadDepartment()
    await loadRoom()
    await loadUser()
    await loadCourse()
    await loadCondition()

    // Add condition to course
    const {
        course1,
        course2,
        course3,
        course4,
        course5,
    } = await getCourse()
    const {
        condition11,
        condition12,
        condition21,
        condition22,
        condition31,
        condition41,
        condition51,
        condition52
    } = await getCondition()
    course1.condition = [condition11, condition12]
    course2.condition = [condition21, condition22]
    course3.condition = [condition31]
    course4.condition = [condition41]
    course5.condition = [condition51, condition52]

    await loadTopic()

    // Add topic to course
    const {
        topic11,
        topic21,
        topic31,
        topic41,
        topic51,
        topic52,
    } = await getTopic()
    course1.topic = topic11
    course2.topic = topic21
    course3.topic = topic31
    course4.topic = topic41
    course5.topic = topic51
    course5.topic.push(topic52)

    await loadQuiz()
    await loadExam()

    // Add exam to course
    const {
        exam1,
        exam2,
        exam3,
        exam4,
        exam5,
    } = await getExam()
    course1.exam = exam1
    course2.exam = exam2
    course3.exam = exam3
    course4.exam = exam4
    course5.exam = exam5

    await loadActivity()

    // Add activity to course
    const {
        activity1,
        activity2,
        activity3,
        activity4,
        activity5,
        activity6,
        activity7,
    } = await getActivity()
    course1.activity = activity1
    course2.activity = activity2
    course2.activity.push(activity6)
    course3.activity = activity3
    course3.activity.push(activity7)
    course4.activity = activity4
    course5.activity = activity5

    // Save all changes on Course
    course1.save()
    course2.save()
    course3.save()
    course4.save()
    course5.save()
}