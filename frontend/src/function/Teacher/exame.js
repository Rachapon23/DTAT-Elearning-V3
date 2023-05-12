import axios from 'axios'
import { Buffer } from "buffer";

// GET: /list-exam
export const listExam = async (authtoken) =>
    await axios.get(process.env.REACT_APP_API + `/list-exam`, {
        headers: {
            authtoken,
        }
    });

// GET: /get-exam/:id
export const getExam = async (authtoken, id) =>
    await axios.get(process.env.REACT_APP_API + `/get-exam/${id}`, {
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

// POST: /create-file/private/:field (exam)
export const createFile = async (authtoken, data, field) =>
    await axios.post(process.env.REACT_APP_API + `/create-file/private/${field}`, data, {
        headers: {
            authtoken,
        }
    });

// POST: /get-image/:field/:id
export const getPrivateFieldImage = async (authtoken, field, param, value) =>
    await axios.get(process.env.REACT_APP_API + `/get-image/private/${field}?${param}=${value}`, {
        headers: {
            authtoken,
        },
        responseType: "blob"
    });

// POST: /create-exam
export const createExam = async (authtoken, data) =>
    await axios.post(process.env.REACT_APP_API + `/create-exam`, data, {
        headers: {
            authtoken,
        }
    });

// POST: /create-exam
export const updateExam = async (authtoken, id, data) =>
    await axios.put(process.env.REACT_APP_API + `/update-exam/${id}`, data, {
        headers: {
            authtoken,
        }
    });