const { loadCalendar, getCalendar } = require("./calendar");

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
        course6,
        course7,
        course8,
        course9,
        course10,
    } = await getCourse()
    const {
        condition61,
        condition62,
        condition71,
        condition72,
        condition81,
        condition91,
        condition101,
        condition102
    } = await getCondition()
    course6.condition = [condition61, condition62]
    course7.condition = [condition71, condition72]
    course8.condition = [condition81]
    course9.condition = [condition91]
    course10.condition = [condition101, condition102]

    await loadTopic()

    // Add topic to course
    const {
        topic11,
        topic21,
        topic31,
        topic41,
        topic51,
        topic52,
        topic61,
        topic71,
        topic81,
        topic91,
        topic101,
    } = await getTopic()
    course1.topic = topic11
    course2.topic = topic21
    course3.topic = topic31
    course4.topic = topic41
    course5.topic = topic51
    course5.topic.push(topic52)
    course6.topic = topic61
    course7.topic = topic71
    course8.topic = topic81
    course9.topic = topic91
    course10.topic = topic101


    await loadQuiz()
    await loadExam()

    // Add exam to course
    const {
        exam1,
        exam2,
        exam3,
        exam4,
        exam5,
        exam6,
        exam7,
        exam8,
        exam9,
        exam10,
    } = await getExam()
    course1.exam = exam1
    course2.exam = exam2
    course3.exam = exam3
    course4.exam = exam4
    course5.exam = exam5
    course6.exam = exam6
    course7.exam = exam7
    course8.exam = exam8
    course9.exam = exam9
    course10.exam = exam10

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

    await loadCalendar()
    const {
        calendar6,
        calendar7,
    } = await getCalendar()
    course6.calendar = calendar6
    course7.calendar = calendar7

    // Save all changes on Course
    course1.save()
    course2.save()
    course3.save()
    course4.save()
    course5.save()
    course6.save()
    course7.save()
    course8.save()
    course9.save()
    course10.save()
}