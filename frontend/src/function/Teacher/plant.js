import axios from 'axios'


// GET: /list-plant
export const listPlant = async (authtoken, query) => {
    let reqStr = `/list-plant/sp/no-duplicate`
    if (query) reqStr += query
    return await axios.get(process.env.REACT_APP_API + reqStr, {
        headers: {
            authtoken,
        }
    });
}