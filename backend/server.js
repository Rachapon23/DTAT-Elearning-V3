const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const { readdirSync } = require('fs')

require('dotenv').config()

const app = express()

const loadData = async () => {

    const User = require("./models/user");
    const Plant = require("./models/plant");
    const Role = require("./models/role");
    const Department = require("./models/department");
    const bcrypt = require("bcryptjs");
    const Layout = require("./models/layout");
    const Course = require("./models/course");
    const Room = require("./models/layout");
    const Condition = require('./models/condition');

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

    // Layout
    await Layout.findOneAndUpdate(
        { room: "Material 1" },
        { room: "Material 1", floor: 1 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Layout.findOneAndUpdate(
        { room: "Technical Skill 1" },
        { room: "Technical Skill 1", floor: 1 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Layout.findOneAndUpdate(
        { room: "Technical Skill 2" },
        { room: "Technical Skill 2", floor: 1 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Layout.findOneAndUpdate(
        { room: "Technical Skill 3" },
        { room: "Technical Skill 3", floor: 1 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Layout.findOneAndUpdate(
        { room: "Technical Skill 4" },
        { room: "Technical Skill 4", floor: 1 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Layout.findOneAndUpdate(
        { room: "Office" },
        { room: "Office", floor: 1 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Layout.findOneAndUpdate(
        { room: "Teacher Room" },
        { room: "Teacher Room", floor: 1 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Layout.findOneAndUpdate(
        { room: "Guest Room" },
        { room: "Guest Room", floor: 1 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Layout.findOneAndUpdate(
        { room: "Material 2" },
        { room: "Material 2", floor: 2 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Layout.findOneAndUpdate(
        { room: "Technical Skill 5" },
        { room: "Technical Skill 5", floor: 2 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Layout.findOneAndUpdate(
        { room: "Technical Skill 6" },
        { room: "Technical Skill 6", floor: 2 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Layout.findOneAndUpdate(
        { room: "Technical Skill 7" },
        { room: "Technical Skill 7", floor: 2 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Layout.findOneAndUpdate(
        { room: "Discussion 1" },
        { room: "Discussion 1", floor: 2 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Layout.findOneAndUpdate(
        { room: "Discussion 2" },
        { room: "Discussion 2", floor: 2 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Layout.findOneAndUpdate(
        { room: "Discussion 3" },
        { room: "Discussion 3", floor: 2 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Layout.findOneAndUpdate(
        { room: "Lecture 1" },
        { room: "Lecture 1", floor: 2 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Layout.findOneAndUpdate(
        { room: "Lecture 2" },
        { room: "Lecture 2", floor: 2 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await Layout.findOneAndUpdate(
        { room: "Hall" },
        { room: "Hall", floor: 2 },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    // User
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
    await Course.findOneAndUpdate(
        { _id: "64264f3c7e51c155540e7750" },
        {
            _id: "64264f3c7e51c155540e7750",
            name: "First load course",
            detail: "First load course",
            room: await Room.findOne({ room: "Technical Skill 3" }).select("_id"),
            video: 2,
            type: true,
            enabled: true,
            condition: [
                await Condition.findOne({_id: "64264e62440e75505b4d5032"}),
                await Condition.findOne({_id: "64264e62440e75505b4d5035"}),
                await Condition.findOne({_id: "64264e62440e75505b4d5038"}),
            ]
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
}

// Static file
app.use(express.static('public'))


//connect cloud Database
mongoose.connect(process.env.DATABASE2, {
    useNewUrlParser: true,
    useUnifiedTopology: false
})
    .then(() => console.log("Connect DataBase success..."))
    .catch((err) => console.log("Connect DataBase error!!! :" + err))

// Data first load when start server
loadData()


//midleware
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

//route
readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)))

//run on PORT
const port = process.env.PORT
app.listen(port, () => {
    console.log("running on port", port)
})


