import axios from 'axios'

// POST: /create-content
export const createTopic = async (authtoken,id) =>
    await axios.post(process.env.REACT_APP_API + `/create-topic/${id}`, {
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
// PUT: /update-topic
export const updateTopic = async (authtoken, course_id,topicData) =>
    await axios.put(process.env.REACT_APP_API + `/update-topic/course/${course_id}`,topicData, {
        headers: {
            authtoken,
        }
    });