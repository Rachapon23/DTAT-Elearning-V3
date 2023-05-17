import axios from 'axios'


// POST: /create-calendar --- special function
export const timeAndRoom = async (authtoken,id,value) =>
    await axios.post(process.env.REACT_APP_API + `/create-timeandroom/course/${id}`,value, {
        headers: {
            authtoken,
        }
    });