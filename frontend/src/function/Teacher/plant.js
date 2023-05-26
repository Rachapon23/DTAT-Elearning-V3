import axios from 'axios'


// GET: /list-plant
export const listPlant = async (authtoken) =>
    await axios.get(process.env.REACT_APP_API + `/list-plant`, {
        headers: {
            authtoken,
        }
    });