const Exam = require("../models/exam")
const Course = require("../models/course")

const allowedField = {
    "exam": Exam,
    "course": Course,
}

// image and file when create will use this API together
// when get file and image will use seperate API due to field in DB and this will made display between image and file in frontend much easier

// POST: /create-file/private/:field
exports.createPrivateFile = async (req, res) => {
    try {
        // this API take action like acknowledge from server thst file has been created
        // real action of save file to backend are in middleware 
        const payload = {
            name: req?.body?.name,
            original_name: req?.body?.original_name,
            // upload_type: req?.body?.upload_type,
        }
        res.json({ data: payload });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ error: "Server Error!!! on create file" });
    }
};

// GET: /get-image/private/:field?<file | id>=<value>
exports.getPrivateFieldImage = async (req, res) => {
    try {
        const field = req?.params?.field
        if (!field) {
            return res.status(500).json({ error: "Cannot get private field image" });
        }

        if (req?.query?.id) {
            let hasError = false
            const image_data = await allowedField[field].findOne({ _id: id }).select("image -_id")
            res.sendFile(`private/uploads/${field}/${image_data?.image?.name}`, { root: "." }, (err) => {
                if (err) {
                    console.log(err)
                    hasError = true
                }
            });
            if (hasError) return res.status(500).json({ error: "Cannot get private field image by ID" });
        }
        else if (req?.query?.file) {
            const file = req?.query?.file
            let hasError = false
            res.sendFile(`private/uploads/${field}/${file}`, { root: "." }, (err) => {
                if (err) {
                    console.log(err)
                    hasError = true
                }
            });
            if (hasError) return res.status(500).json({ error: "Cannot get private field image by name" });
        }
        else {
            return res.status(500).json({ error: "Cannot get private field image (invalid query parameter)" });
        }

    }
    catch (err) {
        console.log(err);
        res.status(500).send({ error: "Server Error!!! on get private field image" });
    }
}

// POST: /create-file/public/:field
exports.createPublicFile = (req, res) => {
    try {
        // this API take action like acknowledge from server thst file has been created
        // real action of save file to backend are in middleware 
        const payload = {
            name: req?.body?.name,
            original_name: req?.body?.original_name,
            // upload_type: req?.body?.upload_type,
        }
        res.json({ data: payload });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ error: "Server Error!!! on create file" });
    }
}

// exports.getPublicFieldImage = async (req, res) => {
//     try {
//         const field = req?.params?.field
//         if (!field) {
//             return res.status(500).json({ error: "Cannot get public field image" });
//         }

//         if (req?.query?.id) {
//             let hasError = false
//             const image_data = await allowedField[field].findOne({ _id: id }).select("image -_id")
//             res.sendFile(`public/uploads/${field}/${image_data?.image?.name}`, { root: "." }, (err) => {
//                 if (err) {
//                     console.log(err)
//                     hasError = true
//                 }
//             });
//             if (hasError) return res.status(500).json({ error: "Cannot get public field image by ID" });
//         }
//         else if (req?.query?.file) {
//             const file = req?.query?.file
//             let hasError = false
//             res.sendFile(`public/uploads/${field}/${file}`, { root: "." }, (err) => {
//                 if (err) {
//                     console.log(err)
//                     hasError = true
//                 }
//             });
//             if (hasError) return res.status(500).json({ error: "Cannot get public field image by name" });
//         }
//         else {
//             return res.status(500).json({ error: "Cannot get public field image (invalid query parameter)" });
//         }

//     }
//     catch (err) {
//         console.log(err);
//         res.status(500).send({ error: "Server Error!!! on get public field image" });
//     }
// }