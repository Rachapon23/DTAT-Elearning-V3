import axios from 'axios'

// GET: /list-course
export const listCourse = async (authtoken, query) => {
    let reqStr = `/list-course`
    if (query) reqStr += query
    return await axios.get(process.env.REACT_APP_API + reqStr, {
        headers: {
            authtoken,
        }
    });
}

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

