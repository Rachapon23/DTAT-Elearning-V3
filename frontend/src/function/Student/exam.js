import axios from 'axios'

// GET: /get-exam/:id
export const getExam = async (authtoken, id, query) => {
    let reqStr = `/get-exam/${id}`
    if (query) reqStr += query
    return await axios.get(process.env.REACT_APP_API + reqStr, {
        headers: {
            authtoken,
        }
    });
}

// PUT: /update-activity/:id/send-exam
export const sendExam = async (authtoken, id, data) =>
    await axios.put(process.env.REACT_APP_API + `/update-activity/${id}/send-exam`, data, {
        headers: {
            authtoken,
        }
    });


