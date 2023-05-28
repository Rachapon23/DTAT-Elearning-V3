import axios from 'axios'

// GET: /list-course
export const listCourse = async (authtoken) =>
    await axios.get(process.env.REACT_APP_API + `/list-course`, {
        headers: {
            authtoken,
        }
    });