import axios from 'axios'


// GET: /list-room
export const listRoom = async (authtoken) =>
    await axios.get(process.env.REACT_APP_API + `/list-room`, {
        headers: {
            authtoken,
        }
    });