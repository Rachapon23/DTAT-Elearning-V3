import axios from 'axios'

// POST: /create-course
export const createCourse = async (authtoken, value) =>
    await axios.post(process.env.REACT_APP_API + `/create-course`, value, {
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
export const getCourse = async (authtoken, id, query) => {
    let reqStr = `/get-course/${id}`
    if (query) reqStr += query
    return await axios.get(process.env.REACT_APP_API + reqStr, {
        headers: {
            authtoken,
        }
    });
}

// DELETE: /remove-course
export const removeCourse = async (authtoken, id) =>
    await axios.delete(process.env.REACT_APP_API + `/remove-course/${id}`, {
        headers: {
            authtoken,
        }
    });

// GET: /list-activity
export const listActivity = async (authtoken, query) => {
    let reqStr = `/list-activity`
    if (query) reqStr += query
    return await axios.get(process.env.REACT_APP_API + reqStr, {
        headers: {
            authtoken,
        }
    });
}

// GET: /list-activity
export const updateActivityResult = async (authtoken, id, data) =>
    await axios.put(process.env.REACT_APP_API + `/update-activity/${id}/result`, data, {
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


// DELETE: /delete-file/course/:id
export const deleteFileCourse = async (authtoken, course_id) =>
    await axios.delete(process.env.REACT_APP_API + `/delete-file/course/${course_id}`, {
        headers: {
            authtoken,
        }
    });

