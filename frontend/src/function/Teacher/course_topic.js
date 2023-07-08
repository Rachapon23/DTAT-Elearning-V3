import axios from 'axios'

// POST: /create-content
export const createTopic = async (authtoken, id) =>
    await axios.post(process.env.REACT_APP_API + `/create-topic/${id}`, {}, {
        headers: {
            authtoken,
        }
    });

// GET: /list-topic
export const listTopicCourse = async (authtoken, course_id) =>
    await axios.get(process.env.REACT_APP_API + `/list-topic/course/${course_id}`, {
        headers: {
            authtoken,
        }
    });

// DELETE: /remove-topic
export const removeTopic = async (authtoken, id) =>
    await axios.delete(process.env.REACT_APP_API + `/remove-topic/${id}`, {
        headers: {
            authtoken,
        }
    });
// // PUT: /update-topic
// export const updateTopic = async (authtoken, course_id,topicData) =>
//     await axios.put(process.env.REACT_APP_API + `/update-topic/course/${course_id}`,topicData, {
//         headers: {
//             authtoken,
//         }
//     });

// PUT: /update-topic
export const updateTopic = async (authtoken, course_id, value) =>
    await axios.put(process.env.REACT_APP_API + `/update-topic/course/${course_id}`, value, {
        headers: {
            authtoken,
        }
    });
// PUT: /add-sub/topic/id
export const addSubTopic = async (authtoken, id) =>
    await axios.put(process.env.REACT_APP_API + `/add-sub/topic/${id}`, {},{
        headers: {
            authtoken,
        }
    });
// PUT: /remove-sub/topic/id
export const removeSubTopic = async (authtoken, id, value) =>
    await axios.put(process.env.REACT_APP_API + `/remove-sub/topic/${id}`, value, {
        headers: {
            authtoken,
        }
    });
// PUT: /update-sub/topic/id
export const updateSubTopic = async (authtoken, id, value) =>
    await axios.put(process.env.REACT_APP_API + `/update-sub/topic/${id}`, value, {
        headers: {
            authtoken,
        }
    });

// PUT: /add-link/topic/id
export const addLinkTopic = async (authtoken, id) =>
    await axios.put(process.env.REACT_APP_API + `/add-link/topic/${id}`, {}, {
        headers: {
            authtoken,
        }
    });
// PUT: /remove-link/topic/id
export const removeLinkTopic = async (authtoken, id, value) =>
    await axios.put(process.env.REACT_APP_API + `/remove-link/topic/${id}`, value, {
        headers: {
            authtoken,
        }
    });
// PUT: /update-sub/topic/id
export const updateLinkTopic = async (authtoken, id, value) =>
    await axios.put(process.env.REACT_APP_API + `/update-link/topic/${id}`, value, {
        headers: {
            authtoken,
        }
    });
// PUT: /remove-file/topic/id
export const removeFileTopic = async (authtoken, id, value) =>
    await axios.put(process.env.REACT_APP_API + `/remove-file/topic/${id}`, value, {
        headers: {
            authtoken,
        }
    });