import axios from 'axios'
import { Buffer } from "buffer";

// GET: /list-exam
export const listExam = async (authtoken) =>
    await axios.get(process.env.REACT_APP_API + `/list-exam`, {
        headers: {
            authtoken,
        }
    });

// DELETE: /remove-exam
export const removeExam = async (authtoken, id) =>
    await axios.delete(process.env.REACT_APP_API + `/remove-exam/${id}`, {
        headers: {
            authtoken,
        }
    });

// GET: /get-course/sp/count
export const getCourseCount = async (authtoken) =>
    await axios.get(process.env.REACT_APP_API + `/get-course/sp/count`, {
        headers: {
            authtoken,
        }
    });

// GET: /get-course/sp/wo/quiz
export const getCourseWoQuiz = async (authtoken) =>
    await axios.get(process.env.REACT_APP_API + `/list-course/sp/wo/quiz`, {
        headers: {
            authtoken,
        }
    });

// POST: /create-file/:field (exam)
export const createFile = async (authtoken, data, field) =>
    await axios.post(process.env.REACT_APP_API + `/create-file/${field}`, data, {
        headers: {
            authtoken,
        }
    });

// POST: /get-image/:field/:id
export const getPrivateFieldImage = async (authtoken, field, param, value) => 
    await axios.get(process.env.REACT_APP_API + `/get-image/${field}?${param}=${value}`, {
        headers: {
            authtoken,
        },
        responseType: "blob"
    });
