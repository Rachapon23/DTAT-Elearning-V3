import axios from 'axios'

// GET: /list-course
export const listCalendar = async (authtoken) =>
    await axios.get(process.env.REACT_APP_API + `/list-calendar`, {
        headers: {
            authtoken,
        }
    });
// POST: /create-calendar/course/id
export const createCalendar = async (authtoken, id,value) =>
  await axios.post(
    process.env.REACT_APP_API + `/create-calendar/course/${id}`,value,
    {
      headers: {
        authtoken,
      },
    }
  );
// PUT: /create-calendar/id
export const updateCalendar = async (authtoken, id,value) =>
  await axios.put(
    process.env.REACT_APP_API + `/update-calendar/${id}`,value,
    {
      headers: {
        authtoken,
      },
    }
  );
// DELETE: /delete-calendar/id
export const deleteCalendar = async (authtoken, id) =>
  await axios.delete(
    process.env.REACT_APP_API + `/delete-calendar/${id}`,
    {
      headers: {
        authtoken,
      },
    }
  );