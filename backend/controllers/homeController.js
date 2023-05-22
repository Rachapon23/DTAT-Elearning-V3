const Home = require('../models/home')
const fs = require("fs");


exports.createAcnounce = async (req, res) => {
    try {
        const { name, original_name } = req?.body

        // console.log(req?.body)
        const dataBaseAcnounce = await Home.find({})
        if (Array.isArray(dataBaseAcnounce) && name && original_name) {
            if (dataBaseAcnounce.length === 0) {
                const acnounce = await new Home({
                    acnounce: {
                        name: name,
                        original_name: original_name,
                        url: `/acnounce/${name}`
                    }
                }).save()
                return res.status(200).json({ data: acnounce })
            }
            else if (dataBaseAcnounce.length === 1) {
                dataBaseAcnounce[0].acnounce.push({
                    name: name,
                    original_name: original_name,
                    url: `/acnounce/${name}`
                })
                await dataBaseAcnounce[0].save()

                return res.status(200).json({ data: dataBaseAcnounce[0] })
            }
            else {
                return res.status(500).json({ error: "Unexpected error on create carousel" })
            }
        }
        return res.status(400).json({ error: "Invalid data fomat" })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Unexpected error on create carousel" })
    }
}


exports.getHome = async (req, res) => {
    try {
        const dataBaseAcnounce = await Home.find({})
        if (Array.isArray(dataBaseAcnounce)) {
            if (dataBaseAcnounce.length === 0) {
                return res.status(200).json({ data: null })
            }
            else if (dataBaseAcnounce.length === 1) {
                return res.status(200).json({ data: dataBaseAcnounce[0] })
            }
            else {
                return res.status(500).json({ error: "Unexpected error on get home" })
            }
        }
        return res.status(500).json({ error: "Unexpected error on get home" })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "Unexpected error on get home" })
    }
}

exports.updateAcnounce = async (req, res) => {
    try {
        const { acnounce, remove } = req?.body

        const dataBaseAcnounce = await Home.find({})
        if (Array.isArray(dataBaseAcnounce)) {
            if (dataBaseAcnounce.length === 0) {

                const payload = await new Home({
                    acnounce: acnounce
                }).save()

                if (remove) {
                    fs.unlink(`./public/uploads${remove?.url}`,
                        (err) => {
                            if (err) {
                                console.log(err)
                                error_deleteFile = true
                            }
                        }
                    )

                }


                return res.status(200).json({ data: payload })
                // return res.status(500).json({ error: "Cannot find acnounce to update" })
            }
            else if (dataBaseAcnounce.length === 1) {
                const payload = await Home.findOneAndUpdate({}, { acnounce: acnounce }, { new: true })


                if (remove) {
                    fs.unlink(`./public/uploads${remove?.url}`,
                        (err) => {
                            if (err) {
                                console.log(err)
                            }
                        }
                    )
                }

                return res.status(200).json({ data: payload })
            }
            else {
                return res.status(500).json({ error: "Unexpected error on update acnounce" })
            }
        }
        return res.status(500).json({ error: "Unexpected error on update acnounce" })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "Unexpected error on update acnounce" })
    }
}

exports.updateCoursePublic = async (req, res) => {
    try {
        // await Home.findOneAndUpdate(
        //     { _id: req.params.id },
        //     { $push: { course_public: req.body.course_public } },
        //     { new: true },
        // )

        const { course_public, remove } = req?.body
        console.log(req?.body)

        const dataBaseCoursePublic = await Home.find({})
        if (Array.isArray(dataBaseCoursePublic)) {
            if (dataBaseCoursePublic.length === 0) {

                const payload = await new Home({
                    course_public: course_public
                }).save()

                if (remove) {
                    fs.unlink(`./public/uploads${remove?.url}`,
                        (err) => {
                            if (err) {
                                console.log(err)
                                error_deleteFile = true
                            }
                        }
                    )

                }


                return res.status(200).json({ data: payload })
                // return res.status(500).json({ error: "Cannot find acnounce to update" })
            }
            else if (dataBaseCoursePublic.length === 1) {
                const payload = await Home.findOneAndUpdate({}, { course_public: course_public }, { new: true })


                if (remove) {
                    fs.unlink(`./public/uploads${remove?.url}`,
                        (err) => {
                            if (err) {
                                console.log(err)
                            }
                        }
                    )
                }

                return res.status(200).json({ data: payload })
            }
            else {
                return res.status(500).json({ error: "Unexpected error on update course public" })
            }
        }
        return res.status(500).json({ error: "Unexpected error on update course public" })


        
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