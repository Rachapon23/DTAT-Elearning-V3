exports.loadData = async () => {

    const User = require("./models/user");
    const Plant = require("./models/plant");
    const Role = require("./models/role");
    const Department = require("./models/department");
    const bcrypt = require("bcryptjs");
    const Room = require("./models/room");
    const Course = require("./models/course");
    const Condition = require('./models/condition');
    const Exam = require("./models/exam");
    const Quiz = require("./models/quiz");

    // Plant
    await Plant.findOneAndUpdate({ name: "A" }, { name: "A" }, { upsert: true, new: true, setDefaultsOnInsert: true })
    await Plant.findOneAndUpdate({ name: "B" }, { name: "B" }, { upsert: true, new: true, setDefaultsOnInsert: true })
    await Plant.findOneAndUpdate({ name: "C" }, { name: "C" }, { upsert: true, new: true, setDefaultsOnInsert: true })
    await Plant.findOneAndUpdate({ name: "D" }, { name: "D" }, { upsert: true, new: true, setDefaultsOnInsert: true })
    await Plant.findOneAndUpdate({ name: "E" }, { name: "E" }, { upsert: true, new: true, setDefaultsOnInsert: true })

    // Role
    await Role.findOneAndUpdate({ name: "student" }, { name: "student" }, { upsert: true, new: true, setDefaultsOnInsert: true })
    await Role.findOneAndUpdate({ name: "teacher" }, { name: "teacher" }, { upsert: true, new: true, setDefaultsOnInsert: true })
    await Role.findOneAndUpdate({ name: "admin" }, { name: "admin" }, { upsert: true, new: true, setDefaultsOnInsert: true })

    // Department
    await Department.findOneAndUpdate({ id: "919323" }, { id: "919323" }, { upsert: true, new: true, setDefaultsOnInsert: true })

    // Room
    await Room.findOneAndUpdate(
        { name: "Material 1" },
        { name: "Material 1", floor: 1 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Room.findOneAndUpdate(
        { name: "Technical Skill 1" },
        { name: "Technical Skill 1", floor: 1 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Room.findOneAndUpdate(
        { name: "Technical Skill 2" },
        { name: "Technical Skill 2", floor: 1 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Room.findOneAndUpdate(
        { name: "Technical Skill 3" },
        { name: "Technical Skill 3", floor: 1 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Room.findOneAndUpdate(
        { name: "Technical Skill 4" },
        { name: "Technical Skill 4", floor: 1 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Room.findOneAndUpdate(
        { name: "Office" },
        { name: "Office", floor: 1 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Room.findOneAndUpdate(
        { name: "Teacher Room" },
        { name: "Teacher Room", floor: 1 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Room.findOneAndUpdate(
        { name: "Guest Room" },
        { name: "Guest Room", floor: 1 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Room.findOneAndUpdate(
        { name: "Material 2" },
        { name: "Material 2", floor: 2 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Room.findOneAndUpdate(
        { name: "Technical Skill 5" },
        { name: "Technical Skill 5", floor: 2 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Room.findOneAndUpdate(
        { name: "Technical Skill 6" },
        { name: "Technical Skill 6", floor: 2 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Room.findOneAndUpdate(
        { name: "Technical Skill 7" },
        { name: "Technical Skill 7", floor: 2 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Room.findOneAndUpdate(
        { name: "Discussion 1" },
        { name: "Discussion 1", floor: 2 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Room.findOneAndUpdate(
        { name: "Discussion 2" },
        { name: "Discussion 2", floor: 2 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Room.findOneAndUpdate(
        { name: "Discussion 3" },
        { name: "Discussion 3", floor: 2 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Room.findOneAndUpdate(
        { name: "Lecture 1" },
        { name: "Lecture 1", floor: 2 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Room.findOneAndUpdate(
        { name: "Lecture 2" },
        { name: "Lecture 2", floor: 2 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Room.findOneAndUpdate(
        { name: "Hall" },
        { name: "Hall", floor: 2 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    // User
    // Admin
    await User.findOneAndUpdate(
        { employee: "6100319" },
        {
            employee: "6100319",
            department: await Department.findOne({ id: "919323" }).select("_id"),
            firstname: "Rachapon",
            lastname: "Pongkittisak",
            profile: null,
            role: await Role.findOne({ name: "admin" }).select("_id"),
            plant: await Plant.findOne({ name: "A" }).select("_id"),
            verified: false,
            enable: true,
            email: "a@g.com",
            password: await bcrypt.hash("123456", await bcrypt.genSalt(10)),
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    // Teacher
    await User.findOneAndUpdate(
        { employee: "6100999" },
        {
            employee: "6100999",
            department: await Department.findOne({ id: "919323" }).select("_id"),
            firstname: "John",
            lastname: "Marton",
            profile: null,
            role: await Role.findOne({ name: "teacher" }).select("_id"),
            plant: await Plant.findOne({ name: "A" }).select("_id"),
            verified: false,
            enable: true,
            email: "ateacher@g.com",
            password: await bcrypt.hash("123456", await bcrypt.genSalt(10)),
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    // Student
    await User.findOneAndUpdate(
        { employee: "6100888" },
        {
            employee: "6100888",
            department: await Department.findOne({ id: "919323" }).select("_id"),
            firstname: "Smith",
            lastname: "Saluman",
            profile: null,
            role: await Role.findOne({ name: "student" }).select("_id"),
            plant: await Plant.findOne({ name: "A" }).select("_id"),
            verified: false,
            enable: true,
            email: "astudent@g.com",
            password: await bcrypt.hash("123456", await bcrypt.genSalt(10)),
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    // Condition
    await Condition.findOneAndUpdate(
        { _id: "64264e62440e75505b4d5032" },
        {
            _id: "64264e62440e75505b4d5032",
            plant: await Plant.findOne({ name: "A" }).select("_id"),
            maximum: 10,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    await Condition.findOneAndUpdate(
        { _id: "64264e62440e75505b4d5035" },
        {
            _id: "64264e62440e75505b4d5035",
            plant: await Plant.findOne({ name: "B" }).select("_id"),
            maximum: 20,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    await Condition.findOneAndUpdate(
        { _id: "64264e62440e75505b4d5038" },
        {
            _id: "64264e62440e75505b4d5038",
            plant: await Plant.findOne({ name: "C" }).select("_id"),
            maximum: 30,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )


    // Course
    const course1 = await Course.findOneAndUpdate(
        { _id: "64264f3c7e51c155540e7750" },
        {
            _id: "64264f3c7e51c155540e7750",
            name: "First load course",
            detail: "First load course",
            room: await Room.findOne({ name: "Technical Skill 3" }).select("_id"),
            video: 2,
            type: true,
            enabled: true,
            teacher: await User.findOne({ employee: "6100319" }),
            condition: [
                await Condition.findOne({ _id: "64264e62440e75505b4d5032" }),
                await Condition.findOne({ _id: "64264e62440e75505b4d5035" }),
                await Condition.findOne({ _id: "64264e62440e75505b4d5038" }),
            ],
            exam: null,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    const course2 = await Course.findOneAndUpdate(
        { name: "Introduction of Docker" },
        {
            name: "Introduction of Docker",
            detail: "Introduction of Docker Detail ",
            room: await Room.findOne({ name: "Technical Skill 2" }).select("_id"),
            video: 2,
            type: true,
            enabled: true,
            teacher: await User.findOne({ employee: "6100319" }),
            condition: [
                await Condition.findOne({ _id: "64264e62440e75505b4d5032" }),
                await Condition.findOne({ _id: "64264e62440e75505b4d5035" }),
                await Condition.findOne({ _id: "64264e62440e75505b4d5038" }),
            ]
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    const course3 = await Course.findOneAndUpdate(
        { name: "Basic of IoT" },
        {
            name: "Basic of IoT",
            detail: "Basic of IoT Detail ",
            room: await Room.findOne({ name: "Technical Skill 1" }).select("_id"),
            video: 2,
            type: false,
            enabled: true,
            teacher: await User.findOne({ employee: "6100319" }),
            condition: [
                await Condition.findOne({ _id: "64264e62440e75505b4d5032" }),
                await Condition.findOne({ _id: "64264e62440e75505b4d5035" }),
                await Condition.findOne({ _id: "64264e62440e75505b4d5038" }),
            ]
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    const course4 = await Course.findOneAndUpdate(
        { name: "Arduino" },
        {
            name: "Arduino",
            detail: "Arduino Detail ",
            room: await Room.findOne({ name: "Technical Skill 1" }).select("_id"),
            video: 2,
            type: false,
            enabled: false,
            teacher: await User.findOne({ employee: "6100319" }),
            condition: [
                await Condition.findOne({ _id: "64264e62440e75505b4d5032" }),
                await Condition.findOne({ _id: "64264e62440e75505b4d5035" }),
                await Condition.findOne({ _id: "64264e62440e75505b4d5038" }),
            ]
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    const course5 = await Course.findOneAndUpdate(
        { name: "Software Engineer" },
        {
            name: "Software Engineer",
            detail: "Software Engineer Detail ",
            room: await Room.findOne({ name: "Technical Skill 5" }).select("_id"),
            video: 2,
            type: false,
            enabled: true,
            teacher: await User.findOne({ employee: "6100319" }),
            condition: [
                await Condition.findOne({ _id: "64264e62440e75505b4d5032" }),
                await Condition.findOne({ _id: "64264e62440e75505b4d5035" }),
                await Condition.findOne({ _id: "64264e62440e75505b4d5038" }),
            ]
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    // Quiz
    const quiz1 = await Quiz.findOneAndUpdate(
        { question: "What is docker?" },
        {
            question: "What is docker?",
            choice: [
                "Virtual machine",
                "Operating system",
                "Container technology",
                "Database system"
            ],
            image: null,
            answer: 2,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    const quiz2 = await Quiz.findOneAndUpdate(
        { question: "10 + 20 = ?" },
        {
            question: "10 + 20 = ?",
            choice: [
                "10",
                "20",
                "30",
                "40"
            ],
            image: null,
            answer: 2,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    const quiz3 = await Quiz.findOneAndUpdate(
        { question: "20 + 20 = ?" },
        {
            question: "20 + 20 = ?",
            choice: [
                "10",
                "20",
                "30",
                "40"
            ],
            image: null,
            answer: 3,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    // Exam
    const exam1 = await Exam.findOneAndUpdate(
        { name: "Introduction of Docker Final test" },
        {
            name: "Introduction of Docker Final test",
            detail: "Introduction of Docker Final test Detail ",
            teacher: await User.findOne({ employee: "6100319" }),
            quiz: [
                quiz1,
                quiz2,
                quiz3,
            ],
            course: course2,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    course2.exam = exam1
    course2.save()

    const exam2 = await Exam.findOneAndUpdate(
        { name: "Basic of IoT Final test" },
        {
            name: "Basic of IoT Final test",
            detail: "Basic of IoT Final test Detail ",
            teacher: await User.findOne({ employee: "6100319" }),
            quiz: [
                // await Quiz.findOne({ _id: "642ce32ed296e5733ca593df" }),
                // await Quiz.findOne({ _id: "642ce32ed296e5733ca593e0" }),
                // await Quiz.findOne({ _id: "642ce32ed296e5733ca593e1" }),
            ],
            course: course3,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    course3.exam = exam2
    course3.save()

    const exam3 = await Exam.findOneAndUpdate(
        { name: "Arduino Final test" },
        {
            name: "Arduino Final test",
            detail: "Arduino Final test Detail ",
            teacher: await User.findOne({ employee: "6100319" }),
            quiz: [
                // await Quiz.findOne({ _id: "642ce32ed296e5733ca593df" }),
                // await Quiz.findOne({ _id: "642ce32ed296e5733ca593e0" }),
                // await Quiz.findOne({ _id: "642ce32ed296e5733ca593e1" }),
            ],
            course: course4,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    course4.exam = exam3
    course4.save()

    const exam4 = await Exam.findOneAndUpdate(
        { name: "Software Engineer Final test" },
        {
            name: "Software Engineer Final test",
            detail: "Software Engineer Final test Detail ",
            teacher: await User.findOne({ employee: "6100319" }),
            quiz: [
                // await Quiz.findOne({ _id: "642ce32ed296e5733ca593df" }),
                // await Quiz.findOne({ _id: "642ce32ed296e5733ca593e0" }),
                // await Quiz.findOne({ _id: "642ce32ed296e5733ca593e1" }),
            ],
            course: course5,

        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    course5.exam = exam4
    course5.save()

}