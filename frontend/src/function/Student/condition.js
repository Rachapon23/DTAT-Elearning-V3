import axios from 'axios'

// GET: /list-condition/course/:id
export const listCondition = async (authtoken, course_id) =>
    await axios.get(process.env.REACT_APP_API + `/list-condition/course/${course_id}`, {
        headers: {
            authtoken,
        }
    });