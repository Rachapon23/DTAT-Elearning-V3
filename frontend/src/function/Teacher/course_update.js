import axios from "axios";

// PUT: /create-course
export const updateCourseInfo = async (authtoken, value, id) =>
  await axios.put(
    process.env.REACT_APP_API + `/update-course-info/${id}`,
    value,
    {
      headers: {
        authtoken,
      },
    }
  );
// PUT: /create-course
export const updateCourseStatus = async (authtoken, value, id) =>
  await axios.put(
    process.env.REACT_APP_API + `/update-course-status/${id}`,
    value,
    {
      headers: {
        authtoken,
      },
    }
  );

// POST: /update-room
export const updateCourseRoom = async (authtoken, value, id) =>
  await axios.put(
    process.env.REACT_APP_API + `/update-course-room/${id}`,
    value,
    {
      headers: {
        authtoken,
      },
    }
  );


// POST: /create-file/private/:field (course)
export const createFile = async (authtoken, data, field) =>
  await axios.post(
    process.env.REACT_APP_API + `/create-file/private/${field}`,
    data,
    {
      headers: {
        authtoken,
      },
    }
  );

// POST: /create-file/public/:field
export const createFilePublic = async (authtoken, data, field) =>
  await axios.post(process.env.REACT_APP_API + `/create-file/public/${field}`, data, {
    headers: {
      authtoken,
    }
  });
