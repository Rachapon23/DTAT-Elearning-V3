import axios from 'axios'

// POST: /create-condition
export const createCondition = async (authtoken,value,id) =>
    await axios.post(process.env.REACT_APP_API + `/create-condition/${id}`,value, {
        headers: {
            authtoken,
        }
    });

// DELETE: /remove-condition
export const removeCondition = async (authtoken, id,course_id) =>
    await axios.put(process.env.REACT_APP_API + `/remove-condition/${id}`,{course_id}, {
        headers: {
            authtoken,
        }
    });