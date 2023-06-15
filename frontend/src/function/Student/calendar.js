import axios from 'axios'

// GET: /list-calendar-student
export const listCalendar = async (authtoken,id) =>
    await axios.get(process.env.REACT_APP_API + `/list-calendar-student`, {
        headers: {
            authtoken,
        }
    });