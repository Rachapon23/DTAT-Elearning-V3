import axios from 'axios'

// GET: /get-home
export const getHome = async () =>
    await axios.get(process.env.REACT_APP_API + `/get-home`);