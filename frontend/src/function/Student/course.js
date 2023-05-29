import axios from 'axios'

// GET: /list-course
export const listCourse = async (authtoken) =>
    await axios.get(process.env.REACT_APP_API + `/list-course`, {
        headers: {
            authtoken,
        }
    });

// GET: /list-activity
export const listActivity = async (authtoken, query) => {
    let reqStr =  `/list-activity`
    if(query) reqStr += query

    return await axios.get(process.env.REACT_APP_API + reqStr, {
        headers: {
            authtoken,
        }
    });
}