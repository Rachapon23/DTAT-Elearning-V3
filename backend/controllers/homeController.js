
const Home = require('../models/home')
const fs = require("fs");


exports.createCarousel = async (req, res) => {
    try {

    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "Unexpected error on create carousel" })
    }
}


exports.listHome = async (req, res) => {
    try {

    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "Unexpected error on list home" })
    }
}


exports.addCoursePublic = async (req, res) => {
    try {
        await Home.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { course_public: req.body.course_public } },
            { new: true },
        )
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "Unexpected error on add course public" })
    }
}


exports.removeCoursePublic = async (req, res) => {
    try {
        await Home.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { course_public: req.body.course_public } },
            { new: true },
        )
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "Unexpected error on remove course public" })
    }
}


exports.addCoursePrivate = async (req, res) => {
    try {
        await Home.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { course_private: req.body.course_private } },
            { new: true },
        )
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "Unexpected error on add course private" })
    }
}


exports.removeCoursePrivate = async (req, res) => {
    try {
        await Home.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { course_public: req.body.course_public } },
            { new: true },
        )
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "Unexpected error on remove course private" })
    }
}

// ===========================================================================================
// exports.privateCreate = async (req, res) => {
//     try {

//         const hoe = new ReGiscourse({

//             coursee:"63fc557ea6ac3a6bd778a1d3",
//             // register:"63fc557ea6ac3a6bd778a1d3"
//         })
//         await hoe.save()
//         res.send(hoe)

//     } catch (err) {
//         console.log(err)
//         res.status(500).send('Server Error!!! on privateCreate')
//     }
// }
exports.course = async (req, res) => {
    try {
        const { id_course, id } = req.body
        const courselist = await Home.findOne({ _id: id }).exec()
        // console.log(req.body)
        if (courselist.course_public.length >= 5) {
            res.status(400).send("course is full")
        } else {

            courselist.course_public.push(id_course)
            const newcourselist = await Home.findOneAndUpdate({ _id: id }, { course_public: courselist.course_public })
            res.send(newcourselist)
            console.log(courselist)
        }
        // res.send("ok")
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on course')
    }
}
exports.ReGiscourse = async (req, res) => {
    try {
        const { id_course, id } = req.body
        const courselist = await Home.findOne({ _id: id }).exec()
        if (courselist.course_private.length >= 5) {
            res.status(400).send("course is full")
        } else {

            courselist.course_private.push(id_course)
            const newcourselist = await Home.findOneAndUpdate({ _id: id }, { course_private: courselist.course_private })
            res.send(newcourselist)
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on ReGiscourse')
    }
}
exports.listHome = async (req, res) => {
    try {
        const home = await Home.findOne({})
            .populate("course_private course_public")
            .exec()
        // const regis = await ReGiscourse.find({})
        // .populate("coursee")
        // .exec()
        res.send(home)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on list home')
    }
}
exports.removeCarousel = async (req, res) => {
    try {
        // const home = await Home.find({}).exec()
        const carousel = await Home.findOne({ _id: req.body.id })

        await fs.unlink("./public/uploads/" + carousel.carousel[req.body.index], (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("remove Success");
            }
        });

        carousel.carousel.splice(req.body.index, 1)

        const update = await Home.findOneAndUpdate(
            { _id: req.body.id },
            { carousel: carousel.carousel }
        )
        res.send(update)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on remove carousel')
    }
}
exports.removeCourse = async (req, res) => {
    try {
        // const home = await Home.find({}).exec()
        const Course = await Home.findOne({ _id: req.body.id })

        Course.course_public.splice(req.body.index, 1)

        const update = await Home.findOneAndUpdate(
            { _id: req.body.id },
            { course_public: Course.course_public }
        )

        res.send(update)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on remove Course')
    }
}
exports.removeCourse2 = async (req, res) => {
    try {
        // const home = await Home.find({}).exec()
        const Course = await Home.findOne({ _id: req.body.id })

        Course.course_private.splice(req.body.index, 1)

        const update = await Home.findOneAndUpdate(
            { _id: req.body.id },
            { course_private: Course.course_private }
        )

        res.send(update)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on remove Course')
    }
}