import axios from 'axios'

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