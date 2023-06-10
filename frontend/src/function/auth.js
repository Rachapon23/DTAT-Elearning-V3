import axios from 'axios'

// POST: /register
export const register = async (data) =>
    await axios.post(process.env.REACT_APP_API + `/register`, data);

// POST: /login
export const login = async (data) =>
    await axios.post(process.env.REACT_APP_API + `/login`, data);

// POST: /send-email
export const sendEmail = async (data) =>
    await axios.post(process.env.REACT_APP_API + `/send-email`, data);

// GET: /list-department
export const listDepartment = async () =>
    await axios.get(process.env.REACT_APP_API + `/list-department`);

// GET: /list-plant
export const listPlant = async () =>
    await axios.get(process.env.REACT_APP_API + `/list-plant`);

// GET: /check-role
export const checkRole = async (authtoken) =>
    await axios.get(process.env.REACT_APP_API + `/check-role`, {
        headers: {
            authtoken,
        }
    });