
const Profile = require("../models/profile");
const bcrypt = require("bcryptjs");

let admin1
let teacher1
let student1
let student2

exports.loadUser = async () => {
    // Admin
    admin1 = await User.findOneAndUpdate(
        { employee: "6100319" },
        {
            employee: "6100319",
            department: await Department.findOne({ id: "919323" }).select("_id"),
            firstname: "Rachapon",
            lastname: "Pongkittisak",
            profile: await new Profile({
                image: null,
                tel: "0999999999",
                email: "admin@admin.com",
                target: 200,
            }),
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
    teacher1 = await User.findOneAndUpdate(
        { employee: "6100999" },
        {
            employee: "6100999",
            department: await Department.findOne({ id: "919323" }).select("_id"),
            firstname: "John",
            lastname: "Marton",
            profile: await new Profile({
                image: null,
                tel: "0888888888",
                email: "teacher1@teacher.com",
                target: null,
            }).save(),
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
    student1 = await User.findOneAndUpdate(
        { employee: "6100888" },
        {
            employee: "6100888",
            department: await Department.findOne({ id: "919323" }).select("_id"),
            firstname: "Smith",
            lastname: "Saluman",
            profile: await new Profile({
                image: null,
                tel: "0777777777",
                email: "student1@student.com",
                target: null,
            }).save(),
            role: await Role.findOne({ name: "student" }).select("_id"),
            plant: await Plant.findOne({ name: "A" }).select("_id"),
            verified: false,
            enable: true,
            email: "astudent@g.com",
            password: await bcrypt.hash("123456", await bcrypt.genSalt(10)),
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    student2 = await User.findOneAndUpdate(
        { employee: "6100999" },
        {
            employee: "6100999",
            department: await Department.findOne({ id: "919323" }).select("_id"),
            firstname: "Jhon",
            lastname: "Marstion",
            profile: await new Profile({
                image: null,
                tel: "0666666666",
                email: "student2@student.com",
                target: null,
            }).save(),
            role: await Role.findOne({ name: "student" }).select("_id"),
            plant: await Plant.findOne({ name: "B" }).select("_id"),
            verified: false,
            enable: true,
            email: "bstudent@g.com",
            password: await bcrypt.hash("123456", await bcrypt.genSalt(10)),
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
}

exports.getUser = () => {
    return {
        admin1,
        teacher1,
        student1,
        student2
    }
}

