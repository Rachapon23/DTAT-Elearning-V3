import axios from 'axios'

// GET: /list-course
export const listCourse = async (authtoken) =>
    await axios.get(process.env.REACT_APP_API + `/list-course`, {
        headers: {
            authtoken,
        }
    });

// DELETE: /remove-course
export const removeCourse = async (authtoken, id) =>
    await axios.delete(process.env.REACT_APP_API + `/remove-course/${id}`, {
        headers: {
            authtoken,
        }
    });