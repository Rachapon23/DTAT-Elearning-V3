import axios from 'axios'

// GET: /list-user
export const listUser = async (authtoken) =>
    await axios.get(process.env.REACT_APP_API + `/list-user`, {
        headers: {
            authtoken,
        }
    });

// GET: /list-user/:role
export const listUserRole = async (authtoken, role) =>
    await axios.get(process.env.REACT_APP_API + `/list-user/${role}`, {
        headers: {
            authtoken,
        }
    });

// GET: /list-plant
export const listPlant = async (authtoken) =>
    await axios.get(process.env.REACT_APP_API + `/list-plant`, {
        headers: {
            authtoken,
        }
    });

// POST: /create-plant
export const createPlant = async (authtoken, data) =>
    await axios.post(process.env.REACT_APP_API + `/create-plant`, data, {
        headers: {
            authtoken,
        }
    });

// DELETE: /remove-plant/:id
export const removePlant = async (authtoken, id) =>
    await axios.delete(process.env.REACT_APP_API + `/remove-plant/${id}`, {
        headers: {
            authtoken,
        }
    });

// GET: /list-room
export const listRoom = async (authtoken) =>
    await axios.get(process.env.REACT_APP_API + `/list-room`, {
        headers: {
            authtoken,
        }
    });

// POST: /create-plant
export const createRoom = async (authtoken, data) =>
    await axios.post(process.env.REACT_APP_API + `/create-room`, data, {
        headers: {
            authtoken,
        }
    });

// DELETE: /remove-plant/:id
export const removeRoom = async (authtoken, id) =>
    await axios.delete(process.env.REACT_APP_API + `/remove-room/${id}`, {
        headers: {
            authtoken,
        }
    });

// PUT: /update-user/:id/enabled
export const updateUserEnabled = async (authtoken, id, data) =>
    await axios.put(process.env.REACT_APP_API + `/update-user/${id}/enable`, data, {
        headers: {
            authtoken,
        }
    });

// POST: /create-file/public/:field
export const createFilePublic = async (authtoken, data, field) =>
    await axios.post(process.env.REACT_APP_API + `/create-file/public/${field}`, data, {
        headers: {
            authtoken,
        }
    });

// POST: /create-announce
export const createannounce = async (authtoken, data) =>
    await axios.post(process.env.REACT_APP_API + `/create-announce`, data, {
        headers: {
            authtoken,
        }
    });

// GET: /get-home
export const getHome = async () =>
    await axios.get(process.env.REACT_APP_API + `/get-home`);

// DELETE: /update-announce
export const updateannounce = async (authtoken, data) =>
    await axios.put(process.env.REACT_APP_API + `/update-announce`, data, {
        headers: {
            authtoken,
        }
    });

// GET: /list-course
export const listCourse = async (authtoken, query) => {
    let reqStr = `/list-course`
    // console.log(query)
    if (query) reqStr += query

    return await axios.get(process.env.REACT_APP_API + reqStr, {
        headers: {
            authtoken,
        }
    });
}

// DELETE: /update-course-public
export const updateCourse = async (authtoken, data, query) => {
    let reqStr = `/update-course-public`
    if (query) reqStr += query
    return await axios.put(process.env.REACT_APP_API + reqStr, data, {
        headers: {
            authtoken,
        }
    });
}

// POST:  /update-user/:id/role
export const updateUserRole = async (authtoken, id, data) =>
    await axios.put(process.env.REACT_APP_API + `/update-user/${id}/role`, data, {
        headers: {
            authtoken,
        }
    });

// GET:  /list-department
export const listDepartment = async () =>
    await axios.get(process.env.REACT_APP_API + `/list-department`);


// POST: create-department
export const createDepartment = async (authtoken, data) =>
    await axios.post(process.env.REACT_APP_API + `/create-department`, data, {
        headers: {
            authtoken,
        }
    });

// DELETE: /remove-department/:id
export const removeDepartment = async (authtoken, id) =>
    await axios.delete(process.env.REACT_APP_API + `/remove-department/${id}`, {
        headers: {
            authtoken,
        }
    });

// DELETE: /remove-user/:id
export const removeUser = async (authtoken, id) =>
    await axios.delete(process.env.REACT_APP_API + `/remove-user/${id}`, {
        headers: {
            authtoken,
        }
    });