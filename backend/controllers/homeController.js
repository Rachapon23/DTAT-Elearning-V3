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

// GET: /get-home?field=:field&fetch=:fetch
exports.getHome = async (req, res) => {
    try {
        // let field = req?.query?.field
        // let fetch = req?.query?.fetch
        // if(field) field.replace(",", " ")
        // if(fetch) fetch.replace(",", " ")

        const dataBaseAcnounce = await Home.findOne({}).populate(`course_public course_private`, `image name detail`).select(`-_id`)//.populate(`${fetch}`)
        console.log(dataBaseAcnounce)
        if (dataBaseAcnounce) {
            return res.status(200).json({ data: dataBaseAcnounce })
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
    const allowField = ["course_public", "course_private"]
    const allowedSearch = ["type"]
    try {
        // await Home.findOneAndUpdate(
        //     { _id: req.params.id },
        //     { $push: { course_public: req.body.course_public } },
        //     { new: true },
        // )
        const { course_public, course_private, remove } = req?.body


        let fields = req?.query?.field // field for populate
        let fetchs = req?.query?.fetch // fetch field after populate
        let selects = req?.query?.selects // select field in this model
        let search = req?.query?.search // search condition

        const seperator = new RegExp(",", 'g');

        // console.log(req?.query.fetch.replace(seperator, " "))
        if (fields) fields = fields.replace(seperator, " ")
        if (fetchs) fetchs = fetchs.replace(seperator, " ")
        if (selects) selects = selects.replace(seperator, " ")
        if (search) search = search.replace(seperator, " ")


        console.log(fields)
        console.log(fetchs)
        console.log(selects)
        console.log(search)


        // check role
        let searchParams = null
        let updateParams = null
        let option = { new: true }
        switch (req?.user?.role) {
            case "admin":
                searchParams = {}
                if(course_public) updateParams = { course_public: course_public }
                if(course_private) updateParams = { course_private: course_private }
                
                break;
            case "teacher":
                searchParams = {}
                if(course_public) updateParams = { course_public: course_public }
                if(course_private) updateParams = { course_private: course_private }
                break;
            case "student":
                return res.status(403).json({ error: "Access denine for student" });
            default:
                return res.status(404).json({ error: "This role does not exist in system" });
        }

        // validate search
        let searchArray = null
        if (search) searchArray = search.split(",")

        if (searchArray && Array.isArray(searchArray)) {
            if (searchArray.length > allowedSearch.length) return res.status(400).json({ error: "Invalid search parameter(s)" });
            if (searchArray.length > 0) {
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

        }
        else if (search) {
            if (!allowedSearch.includes(fields)) return res.status(400).json({ error: "Invalid search parameter(s)" });
        }

        // validate populateField
        let populateField = null
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
            console.log("===>", fields)
            if (!allowField.includes(fields)) return res.status(400).json({ error: "Invalid field parameter(s)" });
            populateField = fields
        }

        if (!searchParams) return res.status(500).json({ error: "Unexpected error on list courses" });


        // perfrom database thing
        const dataBaseCoursePublic = await Home.find(searchParams)
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
                const payload = await Home.findOneAndUpdate(searchParams, updateParams, option).populate(fields, fetchs)
                console.log(payload)

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