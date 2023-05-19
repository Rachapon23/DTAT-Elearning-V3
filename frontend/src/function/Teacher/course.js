import axios from 'axios'

// POST: /create-course
export const createCourse = async (authtoken,value) =>
    await axios.post(process.env.REACT_APP_API + `/create-course`,value, {
        headers: {
            authtoken,
        }
    });
// GET: /list-course
export const listCourse = async (authtoken) =>
    await axios.get(process.env.REACT_APP_API + `/list-course`, {
        headers: {
            authtoken,
        }
    });
// GET: /get-course
export const getCourse = async (authtoken,id) =>
    await axios.get(process.env.REACT_APP_API + `/get-course/${id}`, {
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


    
