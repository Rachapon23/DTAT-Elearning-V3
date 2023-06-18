import axios from 'axios'

// GET: /list-topic
export const listTopicCourse = async (authtoken, course_id) =>
    await axios.get(process.env.REACT_APP_API + `/list-topic/course/${course_id}`, {
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