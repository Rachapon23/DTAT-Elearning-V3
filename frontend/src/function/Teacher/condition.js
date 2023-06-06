import axios from 'axios'

// POST: /create-condition
export const createCondition = async (authtoken,value,id) =>
    await axios.post(process.env.REACT_APP_API + `/create-condition/${id}`,value, {
        headers: {
            authtoken,
        }
    });

// DELETE: /remove-condition
export const removeCondition = async (authtoken, id) =>
    await axios.delete(process.env.REACT_APP_API + `/remove-condition/${id}`, {
        headers: {
            authtoken,
        }
    });

// /list-condition/course/:id
export const listConditionCourse = async (authtoken, course_id) =>
await axios.get(process.env.REACT_APP_API + `/list-condition/course/${course_id}`, {
    headers: {
        authtoken,
    }
});