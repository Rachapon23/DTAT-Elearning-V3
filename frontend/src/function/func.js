import axios from 'axios'

// GET: /get-home
export const getHome = async () =>
    await axios.get(process.env.REACT_APP_API + `/get-home`);

export const updateTimeusage = async (authtoken, id, data) =>
    await axios.put(process.env.REACT_APP_API + `/update-timeusage/${id}`, data, {
        headers: {
            authtoken,
        }
    });