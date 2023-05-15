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
export const listPlant = async () =>
    await axios.get(process.env.REACT_APP_API + `/list-plant`);

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

// POST: /create-acnounce
export const createAcnounce = async (authtoken, data) =>
    await axios.post(process.env.REACT_APP_API + `/create-acnounce`, data, {
        headers: {
            authtoken,
        }
    });

// GET: /get-home
export const getHome = async () =>
    await axios.get(process.env.REACT_APP_API + `/get-home`);

