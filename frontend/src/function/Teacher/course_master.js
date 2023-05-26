import axios from 'axios'

// PUT: /create-course
export const updateCourseInfo = async (authtoken,value,id) =>
    await axios.put(process.env.REACT_APP_API + `/update-course-info/${id}`,value, {
        headers: {
            authtoken,
        }
    });

// POST: /create-calendar 
export const updateCoursetimeAndRoom = async (authtoken,value,id) =>
    await axios.post(process.env.REACT_APP_API + `/update-course-timeandroom/${id}`,value, {
        headers: {
            authtoken,
        }
    });