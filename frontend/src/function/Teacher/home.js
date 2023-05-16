import axios from 'axios'

// GET: /get-profile/user/:id
export const getProfile= async (authtoken, id) =>
    await axios.get(process.env.REACT_APP_API + `/get-profile/user/${id}`, {
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
