import axios from 'axios'

// GET: /get-profile/user/:id
export const getProfile= async (authtoken, id) =>
    await axios.get(process.env.REACT_APP_API + `/get-profile/user/${id}`, {
        headers: {
            authtoken,
        }
    });

// GET: /list-course
export const listCourse = async (authtoken, query) =>
    await axios.get(process.env.REACT_APP_API + `/list-course${query ? query:""}`, {
        headers: {
            authtoken,
        }
    });

// GET: /list-course/sp/graph
export const listCourseGraphData = async (authtoken) =>
    await axios.get(process.env.REACT_APP_API + `/list-course/sp/graph`, {
        headers: {
            authtoken,
        }
    });
    
