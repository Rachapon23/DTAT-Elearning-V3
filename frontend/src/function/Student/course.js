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

// POST: /create-activity
export const createActivity = async (authtoken, data) =>
    await axios.post(process.env.REACT_APP_API + `/create-activity`, data, {
        headers: {
            authtoken,
        }
    });

// GET: /list-activity
export const listCondition = async (authtoken, query) => {
    let reqStr = `/list-condition`
    if (query) reqStr += query
    return await axios.get(process.env.REACT_APP_API + reqStr, {
        headers: {
            authtoken,
        }
    });
}

// GET: /get-user
export const getUser = async (authtoken, id, query) => {
    let reqStr = `/get-user/${id}`
    if (query) reqStr += query
    return await axios.get(process.env.REACT_APP_API + reqStr, {
        headers: {
            authtoken,
        }
    });
}

// GET: /get-activity
export const getActivity = async (authtoken, id, query) => {
    let reqStr = id ? `/get-activity/${id}` : `/get-activity`
    if (query) reqStr += query
    return await axios.get(process.env.REACT_APP_API + reqStr, {
        headers: {
            authtoken,
        }
    });
}

export const getProfile = async (authtoken, id) =>
    await axios.get(process.env.REACT_APP_API + `/get-profile/user/${id}`, {
        headers: {
            authtoken,
        }
    });